import { getCertificateRequestStatsAction } from "@/features/certificate-request/actions/getCertificateRequestStats.action";

export async function GET() {
  const result = await getCertificateRequestStatsAction();

  if (!result.success || !result.data) {
    const status = result.error?.includes("Unauthorized") ? 401 : 500;
    return Response.json(
      { message: result.error || "Internal Server Error" },
      { status }
    );
  }

  return Response.json(result.data, { status: 200 });
}
