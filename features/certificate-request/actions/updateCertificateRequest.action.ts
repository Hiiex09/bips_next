"use server";

import { verifyAuth } from "@/lib/serverAuth";
import { updateCertificateRequestService } from "../services/updateCertificateRequest.service";
import { certificateRequestUpdateSchema } from "../validation/certificateRequest.schema";

export const updateCertificateRequestAction = async (id: string, data: any) => {
  try {
    const decoded = await verifyAuth();
    const userId = decoded.id || decoded.user_id;

    if (!userId) {
      return { success: false, error: "Invalid token: missing user id" };
    }

    if (!id) {
        return { success: false, error: "Request ID is required" };
    }

    const rawData =
      data instanceof FormData ? Object.fromEntries(data.entries()) : data;

    const validatedData = certificateRequestUpdateSchema.parse(rawData);

    const result = await updateCertificateRequestService({
      id,
      ...validatedData,
      processedById: Number(userId),
    });

    return {
      success: true,
      message: result.message,
      data: result.certificateRequest,
    };
  } catch (error: any) {
    console.error("Action Error:", error);

    if (error.name === "ZodError") {
      return {
        success: false,
        error: error.errors.map((e: any) => `${e.path}: ${e.message}`).join(", "),
      };
    }

    return {
      success: false,
      error: error.message || "Internal Server Error",
    };
  }
};
