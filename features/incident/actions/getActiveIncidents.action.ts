import { getActiveIncidentsService } from "@/features/incident/services/getActiveIncidents.service";

export const getActiveIncidentsAction = async () => {
    try {
        const result = await getActiveIncidentsService();
        return {
            success: true,
            data: result,
        };
    } catch (error: any) {
        console.error("Active incidents action error:", error);
        return {
            success: false,
            error: error.message || "Internal Server Error",
        };
    }
};
