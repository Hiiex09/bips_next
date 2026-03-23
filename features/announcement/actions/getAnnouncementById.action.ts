"use server";

import { getAnnouncementByIdService } from "../services/getAnnouncementById.service";

export const getAnnouncementById = async (id: string) => {
    try {
        if (!id) {
            return { success: false, error: "ID is required" };
        }
        
        const announcement = await getAnnouncementByIdService(id);
        
        return {
            success: true,
            data: announcement
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Failed to fetch announcement"
        };
    }
};
