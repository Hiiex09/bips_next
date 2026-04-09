import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export async function verifyAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    throw new Error("Unauthorized: No token provided");
  }

  // 1. Try to verify the access token
  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.NEXT_JWT_SECRET_ACCESS_TOKEN!
      ) as any;
      return decoded;
    } catch (err: any) {
      // If it's not an expiration error, or we don't have a refresh token, we fail
      if (err.name !== "TokenExpiredError" || !refreshToken) {
        throw new Error("Unauthorized: Invalid access token");
      }
      // If it is an expiration error, we let it fall through to refresh logic
    }
  }

  // 2. We reach here if there's no access token OR if it's expired
  if (!refreshToken) {
    throw new Error("Unauthorized: No refresh token available");
  }

  try {
    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.NEXT_JWT_SECRET_REFRESH_TOKEN!
    ) as any;

    const userId = decodedRefresh.id || decodedRefresh.user_id;
    if (!userId) {
      throw new Error("Unauthorized: Invalid refresh token payload");
    }

    // 3. Verify user in database
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      throw new Error("Unauthorized: User not found");
    }

    // 4. Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: user.id,
        user_id: user.id, // Include both for compatibility with different actions
        email: user.email,
        role: user.role,
      },
      process.env.NEXT_JWT_SECRET_ACCESS_TOKEN!,
      { expiresIn: "15m" }
    );

    // 5. Inject newly minted access token into cookies natively
    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    // Return the freshly verified decoded payload natively
    const newlyDecoded = jwt.verify(
      newAccessToken,
      process.env.NEXT_JWT_SECRET_ACCESS_TOKEN!
    ) as any;

    return newlyDecoded;
  } catch (err: any) {
    throw new Error(`Unauthorized: Invalid refresh token (${err.message})`);
  }
}
