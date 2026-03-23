import { getCertificateRequestByIdAction } from "@/features/certificate-request/actions/getCertificateRequestById.action";
import { updateCertificateRequestAction } from "@/features/certificate-request/actions/updateCertificateRequest.action";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await getCertificateRequestByIdAction(id);

  if (!result.success) {
    return Response.json(
      { message: result.error },
      { status: result.error?.includes("not found") ? 404 : 500 }
    );
  }

  return Response.json({
    message: "Certificate request fetched successfully",
    certificateRequest: result.data,
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const result = await updateCertificateRequestAction(id, body);

    if (!result.success) {
      return Response.json(
        { message: result.error },
        { status: result.error?.includes("not found") ? 404 : 400 }
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
