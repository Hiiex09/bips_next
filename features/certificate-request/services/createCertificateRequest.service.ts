import { prisma } from "@/lib/db";
import { CertificateType } from "@/app/generated/prisma/client";

interface CertificateRequestData {
  userId: number;
  certificateType: string;
  purpose: string;
  contactNumber?: string;
}

const formatCertificateType = (value: string): CertificateType => {
  if (value === "Barangay Clearance") return "BARANGAY_CLEARANCE";
  if (value === "Barangay Indigency") return "BARANGAY_INDIGENCY";
  if (value === "Barangay Residency") return "BARANGAY_RESIDENCY";
  throw new Error("Invalid certificate type");
};

export const createCertificateRequestService = async (data: CertificateRequestData) => {
  const { userId, certificateType, purpose, contactNumber } = data;

  if (!certificateType || !purpose) {
    throw new Error("Certificate type and purpose are required");
  }

  const certificateRequest = await prisma.certificateRequest.create({
    data: {
      residentId: userId,
      certificateType: formatCertificateType(certificateType),
      purpose,
      contactNumber,
    },
    include: {
      resident: true,
    },
  });

  return {
    message: "Certificate request created successfully",
    certificateRequest: {
      id: certificateRequest.id,
      certificateType: certificateRequest.certificateType,
      purpose: certificateRequest.purpose,
      status: certificateRequest.status,
      dateRequested: certificateRequest.dateRequested,
      residentName: `${certificateRequest.resident.firstName} ${certificateRequest.resident.lastName}`,
    },
  };
};
