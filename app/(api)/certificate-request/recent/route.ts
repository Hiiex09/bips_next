import { NextResponse } from "next/server";
import { getRecentCertificateRequestsAction } from "@/features/certificate-request/actions/getRecentCertificateRequests.action";

export async function GET() {
    const result = await getRecentCertificateRequestsAction();
    if (!result.success || !result.data) {
        return NextResponse.json(
            { message: result.error || "Unable to fetch recent certificate requests" },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            message: "Recent certificate requests fetched successfully",
            certificateRequests: result.data,
            total: result.data.length,
        },
        { status: 200 }
    );
}
