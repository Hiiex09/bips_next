import { prisma } from "@/lib/db";

export const getAnnouncementByIdService = async (id: string) => {
    const announcement = await prisma.announcement.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });

    if (!announcement) {
        throw new Error("Announcement not found");
    }

    return announcement;
};
