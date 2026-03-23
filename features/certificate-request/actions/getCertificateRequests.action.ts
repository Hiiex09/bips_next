"use server";

import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { getCertificateRequestsService } from "../services/getCertificateRequests.service";

export const getCertificateRequestsAction = async () => {
  try {
    const authHeader = (await headers()).get("authorization");
    if (!authHeader) {
      return { success: false, error: "Unauthorized: No token provided" };
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.NEXT_JWT_SECRET_ACCESS_TOKEN!);

    const result = await getCertificateRequestsService();

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
