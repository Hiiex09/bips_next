"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getCertificateRequestStatsService } from "../services/getCertificateRequestStats.service";

export const getCertificateRequestStatsAction = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    
    if (!token) {
      return { success: false, error: "Unauthorized: No token provided" };
    }

    jwt.verify(token, process.env.NEXT_JWT_SECRET_ACCESS_TOKEN!);

    const stats = await getCertificateRequestStatsService();

    return {
      success: true,
      data: stats,
    };
  } catch (error: any) {
    console.error("Stats Action Error:", error);

    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }
};
