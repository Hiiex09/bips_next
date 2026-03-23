import { createCertificateRequestAction } from "@/features/certificate-request/actions/createCertificateRequest.action";
import { getCertificateRequestsAction } from "@/features/certificate-request/actions/getCertificateRequests.action";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await createCertificateRequestAction(body);

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
  const result = await getCertificateRequestsAction();

  if (!result.success || !result.data) {
    return Response.json(
      { message: result.error || "Internal Server Error" },
      { status: 500 }
    );
  }

  return Response.json({
    message: "Certificate requests fetched successfully",
    certificateRequests: result.data,
  });
}
