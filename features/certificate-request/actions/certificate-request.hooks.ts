import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CertificateRequest {
    id: string;
    type: string;
    status: string;
    urgency: string;
    purpose?: string;
    remarks?: string;
    dateApproved?: string;
    processedByName?: string | null;
    createdAt: string;
    updatedAt: string;
    resident: {
        id: number;
        firstName: string;
        lastName: string;
        address: string;
    };
}

interface RequestsResponse {
    requests: CertificateRequest[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

interface RequestStats {
    totalPending: number;
    urgentRequests: number;
    completedToday: number;
}

interface FetchRequestsParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    urgency?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
}

export const useFetchRequests = (params: FetchRequestsParams) => {
    return useQuery({
        queryKey: ["certificateRequests", params],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.set("page", params.page.toString());
            if (params.limit) queryParams.set("limit", params.limit.toString());
            if (params.search) queryParams.set("search", params.search);
            if (params.status && params.status !== "all") queryParams.set("status", params.status);
            if (params.urgency && params.urgency !== "all") queryParams.set("urgency", params.urgency);
            if (params.type && params.type !== "all") queryParams.set("type", params.type);
            if (params.dateFrom) queryParams.set("dateFrom", params.dateFrom);
            if (params.dateTo) queryParams.set("dateTo", params.dateTo);

            const response = await fetch(`/certificate-request?${queryParams}`);
            if (!response.ok) throw new Error("Failed to fetch requests");
            return response.json() as Promise<RequestsResponse>;
        },
    });
};

export const useFetchRequestStats = () => {
    return useQuery({
        queryKey: ["requestStats"],
        queryFn: async () => {
            const response = await fetch("/certificate-request/stats");
            if (!response.ok) throw new Error("Failed to fetch request stats");
            return response.json() as Promise<RequestStats>;
        },
    });
};

export const useUpdateRequestStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status, processedById }: { id: string; status: string; processedById?: number }) => {
            const response = await fetch(`/certificate-request/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, processedById }),
            });
            if (!response.ok) throw new Error("Failed to update request status");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certificateRequests"] });
            queryClient.invalidateQueries({ queryKey: ["requestStats"] });
            toast.success("Request status updated successfully");
        },
        onError: () => {
            toast.error("Failed to update request status");
        },
    });
};