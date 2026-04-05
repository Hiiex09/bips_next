import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const totalResidents = await prisma.user.count({
            where: { role: "RESIDENT" },
        })

        return NextResponse.json({ total: totalResidents }, { status: 200 })
    } catch (error) {
        console.error("Internal error")
        return NextResponse.json({ error: error }, { status: 500 })
    }
}