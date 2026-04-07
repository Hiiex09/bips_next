import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const [totalUsers, activeUsers, newThisMonth, pendingUsers] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { status: "ACTIVE" } }),
            prisma.user.count({
                where: {
                    createdAt: {
                        gte: startOfMonth,
                    },
                },
            }),
            prisma.user.count({ where: { status: "SUSPENDED" } }), // Assuming pending is suspended
        ]);

        return NextResponse.json({
            totalUsers,
            activeUsers,
            newThisMonth,
            pendingUsers,
        });
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
