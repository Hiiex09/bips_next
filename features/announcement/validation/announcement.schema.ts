import { z } from "zod";

export const announcementSchema = z.object({
    title: z.string().nonempty("Title is required"),
    content: z.string().nonempty("Content is required"),
    category: z.enum([
        "General",
        "Meeting",
        "Emergency",
        "Event",
        "Curfew"
    ]),
    priority: z.enum(["Normal", "Important", "Urgent"]),
    status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
    expiresAt: z.union([z.string().datetime(), z.date()]).optional().nullable(),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;


export const announcementUpdateSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),
    content: z.string().min(10, "Content must be at least 10 characters").optional(),
    category: z.enum([
        "General",
        "Meeting",
        "Emergency",
        "Event",
        "Curfew"
    ]).optional(),
    priority: z.enum(["Normal", "Important", "Urgent"]).optional(),
    status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
    expiresAt: z.union([z.string().datetime(), z.date()]).optional().nullable(),
});

export type UpdateAnnouncementData = z.infer<typeof announcementUpdateSchema>;
