import { prisma } from "@/lib/db";

export const getCertificateRequestStatsService = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [totalPending, urgentRequests, completedToday] = await Promise.all([
    prisma.certificateRequest.count({
      where: { status: "PENDING" },
    }),
    prisma.certificateRequest.count({
      where: { urgency: "URGENT", status: { not: "REJECTED" } },
    }),
    prisma.certificateRequest.count({
      where: {
        status: { in: ["APPROVED", "READY_FOR_PICKUP"] },
        updatedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    }),
  ]);

  return {
    totalPending,
    urgentRequests,
    completedToday,
  };
};
