"use server";

import { verifyAuth } from "@/lib/serverAuth";
import { getCertificateRequestsService } from "../services/getCertificateRequests.service";

export const getCertificateRequestsAction = async (params: any = {}) => {
  try {
    await verifyAuth();

    const result = await getCertificateRequestsService(params);

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    console.error("Action Error:", error);

    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }
};
