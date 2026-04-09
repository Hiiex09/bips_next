"use server";

import { verifyAuth } from "@/lib/serverAuth";
import { postAnnouncement } from "../services/createAnnouncement.service";
import { announcementSchema } from "../validation/announcement.schema";


export const createAnnouncementAction = async (data: any) => {
    try {
        // 1. Authentication Check
        const decoded = await verifyAuth();
        const userId = decoded.id || decoded.user_id;

        if (!userId) {
            return { success: false, error: "Invalid token: missing user id" };
        }

        // 2. Handle both FormData and plain Objects
        // If data is from a form, convert to object; if from API, use as is.
        const rawData = data instanceof FormData
            ? Object.fromEntries(data.entries())
            : data;

        // 3. Validation

        const validatedData = announcementSchema.parse(rawData);

        // 4. Call Service
        // Note: Make sure decoded contains firstName/lastName or fetch them from DB
        const result = await postAnnouncement({
            ...validatedData,
            userId: userId,
            fullName: decoded.fullName || "Admin User", // Adjust based on your JWT payload
            status: (rawData.status as string) || "PENDING",
            expiresAt: (rawData.expiresAt as string) || undefined,
        });

        return {
            success: true,
            message: result.message,
            data: result.announcement
        };

    } catch (error: any) {
        console.error("Action Error:", error);

        if (error.name === "ZodError") {
            return {
                success: false,
                error: error.errors.map((e: any) => `${e.path}: ${e.message}`).join(", ")
            };
        }

        return {
            success: false,
            error: error.message || "Internal Server Error"
        };
    }
};