import { z } from "zod";

const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

const optionalText = (max: number) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());

export const PREFERRED_CONTACT_OPTIONS = ["EMAIL", "PHONE", "WHATSAPP"] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  company: optionalText(120),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  preferredContact: z.enum(PREFERRED_CONTACT_OPTIONS, {
    errorMap: () => ({ message: "Choose how we should reach you" }),
  }),
  description: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about the project (at least 10 characters)")
    .max(4000),
  budget: optionalText(120),
  timeline: optionalText(120),
  currentWebsite: optionalText(300),
  serviceIds: z
    .array(z.string().min(1))
    .min(1, "Select at least one service"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const INQUIRY_STATUSES = [
  "NEW",
  "CONTACTED",
  "IN_DISCUSSION",
  "WON",
  "CLOSED",
] as const;

export const inquiryStatusSchema = z.object({
  status: z.enum(INQUIRY_STATUSES),
});
