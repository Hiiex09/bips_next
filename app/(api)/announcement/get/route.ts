import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const announcements = await prisma.announcement.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: true,
            },
        });

        const formatted = announcements.map((a) => ({
            id: a.id,
            title: a.title,
            content: a.content,
            category: a.category,
            priority: a.priority,
            status: a.status,
            expiresAt: a.expiresAt,
            createdAt: a.createdAt,

            // ✅ computed author name
            authorName: a.author
                ? `${a.author.firstName} ${a.author.lastName}`
                : "Unknown",
        }));

        return Response.json({
            message: "Announcements fetched successfully",
            announcements: formatted,
        });
    } catch (error: any) {
        return Response.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}