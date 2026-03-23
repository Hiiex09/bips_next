import { prisma } from "@/lib/db";

export const deleteAnnouncementService = async (id: string) => {
    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
        throw new Error("Announcement not found");
    }

    return await prisma.announcement.delete({
        where: { id }
    });
};
