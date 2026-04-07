import { z } from "zod";

export const certificateRequestSchema = z.object({
  certificateType: z.enum([
    "Barangay Clearance",
    "Barangay Indigency",
    "Barangay Residency",
  ]),
  purpose: z.string().nonempty("Purpose is required"),
  contactNumber: z.string().optional(),
});

export type CertificateRequestFormData = z.infer<typeof certificateRequestSchema>;

export const certificateRequestUpdateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "READY_FOR_PICKUP", "REJECTED"]),
  remarks: z.string().optional(),
});

export type UpdateCertificateRequestData = z.infer<typeof certificateRequestUpdateSchema>;
