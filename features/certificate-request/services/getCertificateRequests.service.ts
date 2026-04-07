import { prisma } from "@/lib/db";

export const getCertificateRequestsService = async (params: any = {}) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    urgency,
    type,
    dateFrom,
    dateTo,
  } = params;

  const where: any = {};

  if (status && status !== "all") {
    where.status = status.toUpperCase();
  }

  if (urgency && urgency !== "all") {
    where.urgency = urgency.toUpperCase();
  }

  if (type && type !== "all") {
    where.certificateType = type.toUpperCase();
  }

  if (dateFrom || dateTo) {
    where.dateRequested = {};
    if (dateFrom) where.dateRequested.gte = new Date(dateFrom);
    if (dateTo) where.dateRequested.lte = new Date(new Date(dateTo).setHours(23, 59, 59, 999));
  }

  if (search) {
    where.OR = [
      { resident: { firstName: { contains: search, mode: "insensitive" } } },
      { resident: { lastName: { contains: search, mode: "insensitive" } } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [total, certificateRequests] = await Promise.all([
    prisma.certificateRequest.count({ where }),
    prisma.certificateRequest.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
      include: {
        resident: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            address: true,
          },
        },
        processedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    }),
  ]);

  return {
    requests: certificateRequests.map((req) => ({
      id: req.id,
      resident: req.resident,
      type: req.certificateType,
      certificateType: req.certificateType,
      purpose: req.purpose,
      status: req.status,
      urgency: req.urgency,
      dateRequested: req.dateRequested,
      dateApproved: req.dateApproved,
      processedByName: req.processedBy
        ? `${req.processedBy.firstName} ${req.processedBy.lastName}`
        : null,
      contactNumber: req.contactNumber,
      createdAt: req.createdAt,
    })),
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)) || 1,
    },
  };
};
