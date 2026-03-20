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
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;