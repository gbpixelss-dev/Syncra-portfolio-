"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession, UnauthorizedError } from "@/lib/authz";
import {
  siteSettingsSchema,
  SOCIAL_PLATFORMS,
} from "@/lib/validation/site-settings";
import type { ActionResult } from "@/lib/admin-action-result";

export async function updateSiteSettings(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, error: "You must be signed in." };
    }
    throw error;
  }

  const socialLinks = SOCIAL_PLATFORMS.map((platform) => ({
    platform,
    url: String(formData.get(`social.${platform}`) ?? ""),
  })).filter((link) => link.url.trim() !== "");

  const parsed = siteSettingsSchema.safeParse({
    contactEmail: formData.get("contactEmail"),
    whatsapp: formData.get("whatsapp"),
    socialLinks,
    defaultSeoTitle: formData.get("defaultSeoTitle"),
    defaultSeoDescription: formData.get("defaultSeoDescription"),
  });

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const existing = await prisma.siteSettings.findFirst({
      where: { singleton: true },
    });

    const data = {
      contactEmail: parsed.data.contactEmail ?? null,
      whatsapp: parsed.data.whatsapp ?? null,
      socialLinks: parsed.data.socialLinks,
      defaultSeoTitle: parsed.data.defaultSeoTitle ?? null,
      defaultSeoDescription: parsed.data.defaultSeoDescription ?? null,
    };

    if (existing) {
      await prisma.siteSettings.update({ where: { id: existing.id }, data });
    } else {
      await prisma.siteSettings.create({ data: { singleton: true, ...data } });
    }

    // Contact info appears in the footer (every page) and /contact.
    revalidatePath("/", "layout");
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
