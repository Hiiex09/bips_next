import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    lastLogin?: string;
}

interface UsersResponse {
    users: User[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

interface UserStats {
    totalUsers: number;
    activeUsers: number;
    newThisMonth: number;
    pendingUsers: number;
}

interface FetchUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
}

export const useFetchUsers = (params: FetchUsersParams) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.set("page", params.page.toString());
            if (params.limit) queryParams.set("limit", params.limit.toString());
            if (params.search) queryParams.set("search", params.search);
            if (params.role && params.role !== "all") queryParams.set("role", params.role);
            if (params.status && params.status !== "all") queryParams.set("status", params.status);

            const response = await fetch(`/users?${queryParams}`);
            if (!response.ok) throw new Error("Failed to fetch users");
            return response.json() as Promise<UsersResponse>;
        },
    });
};

export const useFetchUserStats = () => {
    return useQuery({
        queryKey: ["userStats"],
        queryFn: async () => {
            const response = await fetch("/users/stats");
            if (!response.ok) throw new Error("Failed to fetch user stats");
            return response.json() as Promise<UserStats>;
        },
    });
};

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: number; status: string }) => {
            const response = await fetch(`/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) throw new Error("Failed to update user status");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["userStats"] });
            toast.success("User status updated successfully");
        },
        onError: () => {
            toast.error("Failed to update user status");
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete user");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["userStats"] });
            toast.success("User deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete user");
        },
    });
};