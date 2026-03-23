import { prisma } from "@/lib/db";

export const getAnnouncementsService = async () => {
    return await prisma.announcement.findMany({
        where: {
            status: "PUBLISHED"
        },
        orderBy: {
            createdAt: "desc"
        },
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
};
