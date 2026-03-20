import { postAnnouncement } from "@/features/annoucements/services/createAnnouncement";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

interface DecodedUser {
    id: number;
    fullName: string;
}

export async function POST(req: Request) {
    try {
        const authHeader = (await headers()).get("authorization");

        if (!authHeader) {
            return Response.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        const decoded: any = jwt.verify(
            token,
            process.env.NEXT_JWT_SECRET_ACCESS_TOKEN!
        );

        const userId = decoded.id || decoded.user_id;

        if (!userId) {
            return Response.json(
                { message: "Invalid token - missing user id" },
                { status: 401 }
            );
        }

        // 5. Parse request body
        const body = await req.json();

        // 6. Create announcement
        const result = await prisma.announcement.create({
            data: {
                title: body.title,
                content: body.content,
                category: body.category,
                priority: body.priority,
                status: body.status,
                expiresAt: new Date(body.expiresAt), // IMPORTANT FIX

                author: {
                    connect: { id: userId },
                },
            },
            include: {
                author: {
                    select: {
                        role: true,
                        status: true,
                    },
                },
            },
        });

        return Response.json(result, { status: 201 });
    } catch (error: any) {
        return Response.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}


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

function decodeToken(token: string | undefined) {
    throw new Error("Function not implemented.");
}
