import { prisma } from "@/lib/db";

export const getRecentCertificateRequestsService = async () => {
    const certificateRequests = await prisma.certificateRequest.findMany({
        take: 4,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            resident: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            processedBy: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    return certificateRequests.map((req) => ({
        id: req.id,
        residentName: `${req.resident.firstName} ${req.resident.lastName}`,
        certificateType: req.certificateType,
        purpose: req.purpose,
        status: req.status,
        dateRequested: req.dateRequested,
        dateApproved: req.dateApproved,
        processedByName: req.processedBy
            ? `${req.processedBy.firstName} ${req.processedBy.lastName}`
            : null,
        contactNumber: req.contactNumber,
    }));
};
