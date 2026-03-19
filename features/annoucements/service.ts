import { prisma } from "@/lib/db";
import {
    AnnouncementCategory,
    AnnouncementPriority,
    AnnouncementStatus,
} from "@/app/generated/prisma/client";

interface AnnouncementData {
    title: string;
    content: string;
    category: string;
    priority: string;
    status?: string;
    expiresAt?: string;
    userId: number;
    fullName: string;
}

// ✅ safe enum formatter
const formatEnum = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const formatStatus = (value: string) => value.toUpperCase();

export const postAnnouncement = async (data: AnnouncementData) => {
    const {
        title,
        content,
        category,
        priority,
        status,
        expiresAt,
        userId,
    } = data;

    // ✅ validation
    if (!title || !content || !category || !priority) {
        throw new Error(
            "Title, content, category, and priority are required"
        );
    }

    const announcement = await prisma.announcement.create({
        data: {
            title,
            content,

            // ✅ enum conversion
            category: formatEnum(category) as AnnouncementCategory,
            priority: formatEnum(priority) as AnnouncementPriority,

            status: status
                ? (formatStatus(status) as AnnouncementStatus)
                : undefined,

            expiresAt: expiresAt ? new Date(expiresAt) : null,

            authorId: userId,
        },
        include: {
            author: true,
        },
    });

    return {
        message: "Announcement created successfully",
        announcement: {
            id: announcement.id,
            title: announcement.title,
            content: announcement.content,
            category: announcement.category,
            priority: announcement.priority,
            status: announcement.status,
            expiresAt: announcement.expiresAt,

            // ✅ computed author name
            authorName: `${announcement.author.firstName} ${announcement.author.lastName}`,
        },
    };
};