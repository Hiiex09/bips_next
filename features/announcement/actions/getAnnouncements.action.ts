"use server";

import { getAnnouncementsService } from "../services/getAnnouncements.service";

export const getAnnouncements = async () => {
    try {
        const announcements = await getAnnouncementsService();
        return {
            success: true,
            data: announcements
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Failed to fetch announcements"
        };
    }
};
