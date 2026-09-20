import { z } from "zod";
import { slugSchema } from "./slug";

export const TECHNOLOGY_CATEGORIES = [
  "DEVELOPMENT",
  "DESIGN",
  "VIDEO",
  "AI",
  "AUTOMATION",
  "SOCIAL",
  "OTHER",
] as const;

export const technologySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  slug: slugSchema,
  category: z.enum(TECHNOLOGY_CATEGORIES),
});

export type TechnologyInput = z.infer<typeof technologySchema>;
