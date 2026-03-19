import { postAnnouncement } from "@/features/annoucements/service";


export async function POST(req: Request) {
    try {
        const body = await req.json();

        // TEMP user (replace with real auth later)
        const user = {
            id: 1,
            fullName: "John Doe",
        };

        const result = await postAnnouncement({
            title: body.title,
            content: body.content,
            category: body.category,
            priority: body.priority,
            status: body.status,
            expiresAt: body.expiresAt,
            userId: user.id,
            fullName: user.fullName,
        });

        return Response.json(result, { status: 201 });
    } catch (error: any) {
        return Response.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}