import { NextResponse } from "next/server";
import { getPendingCertificateRequestsAction } from "@/features/certificate-request/actions/getPendingCertificateRequests.action";

export async function GET() {
    const result = await getPendingCertificateRequestsAction();
    if (!result.success || !result.data) {
        return NextResponse.json(
            { message: result.error || "Unable to fetch pending certificate requests" },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            message: "Pending certificate requests fetched successfully",
            total: result.data.length,
            certificateRequests: result.data,
        },
        { status: 200 }
    );
}
