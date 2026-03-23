"use server";

import { updateAnnouncementService } from "../services/updateAnnouncement.service";
import { announcementUpdateSchema } from "../validation/announcement.schema";

export const updateAnnouncement = async (id: string, data: any) => {
    try {
        if (!id) {
            return { success: false, error: "ID is required" };
        }

        const rawData = data instanceof FormData
            ? Object.fromEntries(data.entries())
            : data;

        const validatedData = announcementUpdateSchema.parse(rawData);

        const updated = await updateAnnouncementService(id, validatedData);

        return {
            success: true,
            message: "Announcement updated successfully",
            data: updated
        };
    } catch (error: any) {
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
