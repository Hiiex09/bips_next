"use server";

import { verifyAuth } from "@/lib/serverAuth";
import { createCertificateRequestService } from "../services/createCertificateRequest.service";
import { certificateRequestSchema } from "../validation/certificateRequest.schema";

export const createCertificateRequestAction = async (data: any) => {
  try {
    const decoded = await verifyAuth();
    const userId = decoded.id || decoded.user_id;

    if (!userId) {
      return { success: false, error: "Invalid token: missing user id" };
    }

    const rawData =
      data instanceof FormData ? Object.fromEntries(data.entries()) : data;

    const validatedData = certificateRequestSchema.parse(rawData);

    const result = await createCertificateRequestService({
      ...validatedData,
      userId: Number(userId),
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
