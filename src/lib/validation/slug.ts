import { z } from "zod";

/** Lowercase, hyphenated, URL-safe — matches every slug already in use. */
export const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(80)
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and hyphens only (e.g. web-software-development)"
  );
