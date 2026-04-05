import { getRecentCertificateRequestsService } from "@/features/certificate-request/services/getRecentCertificateRequests.service";

export const getRecentCertificateRequestsAction = async () => {
    try {
        const result = await getRecentCertificateRequestsService();
        return {
            success: true,
            data: result,
        };
    } catch (error: any) {
        console.error("Recent requests action error:", error);
        return {
            success: false,
            error: error.message || "Internal Server Error",
        };
    }
};
