

import { createAnnouncementAction } from "@/features/announcement/actions/createAnnouncement.action";
import { getAnnouncements } from "@/features/announcement/actions/getAnnouncements.action";


interface DecodedUser {
    id: number;
    fullName: string;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await createAnnouncementAction(body);

        if (!result.success) {
            const status = result.error?.includes("Unauthorized") ? 401 : 400;
            return Response.json(result, { status });
        }

        return Response.json(result, { status: 201 });
    } catch (error: any) {
        return Response.json(
            { success: false, message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}




export async function GET() {
    const result = await getAnnouncements();

    if (!result.success || !result.data) {
        return Response.json(
            { message: result.error || "Internal Server Error" },
            { status: 500 }
        );
    }

    // Format matches the previous API response expectations
    const formatted = result.data.map((a: any) => ({
        ...a,
        authorName: a.author
            ? `${a.author.firstName} ${a.author.lastName}`
            : "Unknown",
    }));

    return Response.json({
        message: "Announcements fetched successfully",
        announcements: formatted,
    });
}
