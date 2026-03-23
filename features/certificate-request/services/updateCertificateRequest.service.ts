import { prisma } from "@/lib/db";
import { CertificateStatus } from "@/app/generated/prisma/client";

interface UpdateCertificateRequestData {
  id: string;
  processedById: number;
  status: CertificateStatus;
  remarks?: string;
}

export const updateCertificateRequestService = async (data: UpdateCertificateRequestData) => {
  const { id, processedById, status, remarks } = data;

  const existingRequest = await prisma.certificateRequest.findUnique({
    where: { id },
  });

  if (!existingRequest) {
    throw new Error("Certificate request not found");
  }

  const updatedRequest = await prisma.certificateRequest.update({
    where: { id },
    data: {
      status,
      remarks,
      processedById,
      dateApproved: status === "APPROVED" || status === "READY_FOR_PICKUP" ? new Date() : undefined,
    },
    include: {
      resident: true,
      processedBy: true,
    },
  });

  return {
    message: "Certificate request updated successfully",
    certificateRequest: {
      id: updatedRequest.id,
      status: updatedRequest.status,
      remarks: updatedRequest.remarks,
      processedByName: updatedRequest.processedBy
        ? `${updatedRequest.processedBy.firstName} ${updatedRequest.processedBy.lastName}`
        : null,
    },
  };
};
