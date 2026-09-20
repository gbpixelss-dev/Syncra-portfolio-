import { z } from "zod";
import { slugSchema } from "./slug";

const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

const optionalText = (max: number) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());

const optionalUrl = z.preprocess(
  emptyToUndefined,
  z.string().trim().url("Enter a valid URL").optional()
);

export const projectMediaRowSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO", "EMBED"]),
  url: z.string().trim().url("Enter a valid media URL"),
  thumbnailUrl: optionalUrl,
  alt: optionalText(200),
  caption: optionalText(300),
  order: z.coerce.number().int().min(0).default(0),
  isHero: z.boolean().default(false),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  slug: slugSchema,
  client: optionalText(120),
  summary: z.string().trim().min(1, "Summary is required").max(300),
  overview: optionalText(4000),
  challenge: optionalText(4000),
  solution: optionalText(4000),
  process: optionalText(4000),
  results: optionalText(4000),
  liveUrl: optionalUrl,
  featured: z.boolean(),
  published: z.boolean(),
  serviceIds: z.array(z.string().min(1)).min(1, "Select at least one service"),
  technologyIds: z.array(z.string().min(1)).default([]),
  media: z.array(projectMediaRowSchema).default([]),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectMediaRowInput = z.infer<typeof projectMediaRowSchema>;
