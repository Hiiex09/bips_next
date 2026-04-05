import { NextResponse } from "next/server";
import { getActiveIncidentsAction } from "@/features/incident/actions/getActiveIncidents.action";

export async function GET() {
    const result = await getActiveIncidentsAction();

    if (!result.success || !result.data) {
        return NextResponse.json(
            { message: result.error || "Unable to fetch active incidents" },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            message: "Active incidents fetched successfully",
            total: result.data.total,
        },
        { status: 200 }
    );
}
