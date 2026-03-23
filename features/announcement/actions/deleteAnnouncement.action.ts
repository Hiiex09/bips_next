"use server";

import { deleteAnnouncementService } from "../services/deleteAnnouncement.service";

export const deleteAnnouncement = async (id: string) => {
    try {
        if (!id) {
            return { success: false, error: "ID is required" };
        }
        
        await deleteAnnouncementService(id);
        
        return {
            success: true,
            message: "Announcement deleted successfully"
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Failed to delete announcement"
        };
    }
};
