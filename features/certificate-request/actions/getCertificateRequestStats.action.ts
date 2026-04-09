"use server";

import { verifyAuth } from "@/lib/serverAuth";
import { getCertificateRequestStatsService } from "../services/getCertificateRequestStats.service";

export const getCertificateRequestStatsAction = async () => {
  try {
    await verifyAuth();

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
