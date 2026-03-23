import { prisma } from "@/lib/db";

export const getCertificateRequestByIdService = async (id: string) => {
  const certificateRequest = await prisma.certificateRequest.findUnique({
    where: { id },
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

  if (!certificateRequest) {
    throw new Error("Certificate request not found");
  }

  return {
    id: certificateRequest.id,
    residentName: `${certificateRequest.resident.firstName} ${certificateRequest.resident.lastName}`,
    certificateType: certificateRequest.certificateType,
    purpose: certificateRequest.purpose,
    status: certificateRequest.status,
    dateRequested: certificateRequest.dateRequested,
    dateApproved: certificateRequest.dateApproved,
    processedByName: certificateRequest.processedBy
      ? `${certificateRequest.processedBy.firstName} ${certificateRequest.processedBy.lastName}`
      : null,
    remarks: certificateRequest.remarks,
    contactNumber: certificateRequest.contactNumber,
  };
};
