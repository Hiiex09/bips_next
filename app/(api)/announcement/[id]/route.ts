import { deleteAnnouncement } from "@/features/announcement/actions/deleteAnnouncement.action";
import { getAnnouncementById } from "@/features/announcement/actions/getAnnouncementById.action";
import { updateAnnouncement } from "@/features/announcement/actions/updateAnnouncement.action";


export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15, route params are Promises
) {
    const { id } = await params;
    const result = await getAnnouncementById(id);

    if (!result.success) {
        return Response.json(
            { message: result.error },
            { status: result.error === "Announcement not found" ? 404 : 500 }
        );
    }

    const a: any = result.data;
    const formatted = {
        ...a,
        authorName: a.author
            ? `${a.author.firstName} ${a.author.lastName}`
            : "Unknown",
    };

    return Response.json({
        message: "Announcement fetched successfully",
        announcement: formatted,
    });
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await req.json();
        const result = await updateAnnouncement(id, body);

        if (!result.success) {
            return Response.json(
                { message: result.error },
                { status: result.error === "Announcement not found" ? 404 : 400 }
            );
        }

        return Response.json(result, { status: 200 });
    } catch (error: any) {
        return Response.json(
            { message: "Invalid request body" },
            { status: 400 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const result = await deleteAnnouncement(id);

    if (!result.success) {
        return Response.json(
            { message: result.error },
            { status: result.error === "Announcement not found" ? 404 : 500 }
        );
    }

    return Response.json({ message: result.message }, { status: 200 });
}
