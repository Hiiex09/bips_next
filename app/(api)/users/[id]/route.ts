import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json({ error: "Status is required" }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { status: status.toUpperCase() },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = parseInt(id);

        await prisma.$transaction([
            prisma.certificateRequest.deleteMany({
                where: { residentId: userId },
            }),
            prisma.certificateRequest.updateMany({
                where: { processedById: userId },
                data: { processedById: null },
            }),
            prisma.announcement.deleteMany({
                where: { authorId: userId },
            }),
            prisma.user.delete({
                where: { id: userId },
            }),
        ]);

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
