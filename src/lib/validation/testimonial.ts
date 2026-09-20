import { z } from "zod";

const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

export const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  role: z.preprocess(emptyToUndefined, z.string().trim().max(120).optional()),
  company: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(120).optional()
  ),
  quote: z.string().trim().min(1, "Quote is required").max(1000),
  published: z.boolean(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
