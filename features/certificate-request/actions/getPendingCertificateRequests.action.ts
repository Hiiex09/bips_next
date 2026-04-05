import { getPendingCertificateRequestsService } from "@/features/certificate-request/services/getPendingCertificateRequests.service";

export const getPendingCertificateRequestsAction = async () => {
    try {
        const result = await getPendingCertificateRequestsService();
        return {
            success: true,
            data: result,
        };
    } catch (error: any) {
        console.error("Pending requests action error:", error);
        return {
            success: false,
            error: error.message || "Internal Server Error",
        };
    }
};
