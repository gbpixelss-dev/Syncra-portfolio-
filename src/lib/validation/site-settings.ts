import { z } from "zod";

const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

const optionalUrl = z.preprocess(
  emptyToUndefined,
  z.string().trim().url("Enter a valid URL").optional()
);

export const SOCIAL_PLATFORMS = [
  "Instagram",
  "Facebook",
  "TikTok",
  "LinkedIn",
  "X",
  "YouTube",
  "Behance",
  "Dribbble",
  "GitHub",
] as const;

export const socialLinkSchema = z.object({
  platform: z.enum(SOCIAL_PLATFORMS),
  url: z.string().trim().url("Enter a valid URL"),
});

export const siteSettingsSchema = z.object({
  contactEmail: z.preprocess(
    emptyToUndefined,
    z.string().trim().email("Enter a valid email").optional()
  ),
  whatsapp: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(20).optional()
  ),
  socialLinks: z.array(socialLinkSchema).default([]),
  defaultSeoTitle: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(70, "Keep SEO titles under 70 characters").optional()
  ),
  defaultSeoDescription: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(160, "Keep SEO descriptions under 160 characters")
      .optional()
  ),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export { optionalUrl };
