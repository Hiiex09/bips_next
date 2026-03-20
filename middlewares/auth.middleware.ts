import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/utils";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function auth(req: any) {
    const accessToken = req.cookies.get("access_token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (!accessToken) {
        return NextResponse.json(
            { message: "Unauthorized - No token provided" },
            { status: 401 }
        );
    }

    try {
        // Verify access token
        const decoded: any = generateToken(accessToken);

        // Find user in PostgreSQL
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.user_id,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Attach user to request
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user", JSON.stringify(user));

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error: any) {
        // Refresh token logic
        if (error.name === "TokenExpiredError" && refreshToken) {
            try {
                const decodedRefresh: any = generateToken(refreshToken);

                const user = await prisma.user.findUnique({
                    where: {
                        id: decodedRefresh.user_id,
                    },
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                    },
                });

                if (!user) {
                    return NextResponse.json(
                        { message: "User not found" },
                        { status: 404 }
                    );
                }


                // GENERATE NEW ACCESS TOKEN
                const newAccessToken = jwt.sign(
                    {
                        user_id: user.id,
                        email: user.email,
                        role: user.role,
                    },
                    process.env.NEXT_JWT_SECRET_ACCESS_TOKEN!,
                    { expiresIn: "15m" }
                );

                const requestHeaders = new Headers(req.headers);
                requestHeaders.set("x-user", JSON.stringify(user));

                const response = NextResponse.next({
                    request: {
                        headers: requestHeaders,
                    },
                });

                response.headers.set(
                    "Set-Cookie",
                    `access_token=${newAccessToken}; Path=/; HttpOnly; Max-Age=900`
                );
            } catch (err) {
                return NextResponse.json(
                    { message: "Invalid refresh token" },
                    { status: 401 }
                );
            }
        }

        return NextResponse.json(
            { message: "Invalid access token" },
            { status: 401 }
        );
    }
}