import { prisma } from "@/lib/db";
import { UpdateAnnouncementData } from "../validation/announcement.schema";
import { AnnouncementCategory, AnnouncementPriority, AnnouncementStatus } from "@/app/generated/prisma/client";

export const updateAnnouncementService = async (id: string, data: UpdateAnnouncementData) => {
    // Check if announcement exists
    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
        throw new Error("Announcement not found");
    }

    // Helper functions for enum formatting gracefully matching prisma standard
    const formatCategory = (val: string) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    const formatStatus = (val: string) => val.toUpperCase();

    // Map the optional fields
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.category !== undefined) updateData.category = formatCategory(data.category) as AnnouncementCategory;
    if (data.priority !== undefined) updateData.priority = formatCategory(data.priority) as AnnouncementPriority;
    if (data.status !== undefined) updateData.status = formatStatus(data.status) as AnnouncementStatus;
    if (data.expiresAt !== undefined) updateData.expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;

    return await prisma.announcement.update({
        where: { id },
        data: updateData
    });
};
