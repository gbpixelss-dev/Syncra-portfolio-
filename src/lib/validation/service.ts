import { z } from "zod";
import { slugSchema } from "./slug";

export const serviceSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  slug: slugSchema,
  shortDescription: z
    .string()
    .trim()
    .min(1, "Short description is required")
    .max(200),
  description: z.string().trim().min(1, "Description is required").max(4000),
  published: z.boolean(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
