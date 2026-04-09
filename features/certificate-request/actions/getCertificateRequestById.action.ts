"use server";

import { verifyAuth } from "@/lib/serverAuth";
import { getCertificateRequestByIdService } from "../services/getCertificateRequestById.service";

export const getCertificateRequestByIdAction = async (id: string) => {
  try {
    await verifyAuth();

    if (!id) {
        return { success: false, error: "ID is required" };
    }

    const result = await getCertificateRequestByIdService(id);

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
