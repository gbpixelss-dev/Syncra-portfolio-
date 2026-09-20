import { cache } from "react";
import { prisma } from "./db";

/**
 * DATA SOURCE — Phase 8. The database (SiteSettings singleton) is
 * the source of truth for contactEmail/whatsapp/socialLinks. Real,
 * confirmed SYNCra contact details remain the fallback used until an
 * admin explicitly edits Settings (or if the database is
 * unreachable) — never a fabricated value. `location` is not a CMS
 * field in the current schema (no physical office to manage), so it
 * stays a fixed constant.
 */
export type SocialLink = {
  platform: string;
  url: string;
};

const FALLBACK = {
  location: "Lagos, Nigeria",
  whatsapp: "08144624133",
  email: "syncradigitalagency@gmail.com",
} as const;

export type SiteContact = {
  location: string;
  whatsapp: string;
  email: string;
  socialLinks: readonly SocialLink[];
};

export const getSiteSettings = cache(async (): Promise<SiteContact> => {
  try {
    const row = await prisma.siteSettings.findFirst({
      where: { singleton: true },
    });

    if (!row) {
      return { ...FALLBACK, socialLinks: [] };
    }

    return {
      location: FALLBACK.location,
      whatsapp: row.whatsapp ?? FALLBACK.whatsapp,
      email: row.contactEmail ?? FALLBACK.email,
      socialLinks: (row.socialLinks as SocialLink[] | null) ?? [],
    };
  } catch {
    return { ...FALLBACK, socialLinks: [] };
  }
});

export function getWhatsappUrl(whatsapp: string): string {
  return `https://wa.me/234${whatsapp.replace(/^0/, "")}`;
}

export function getEmailUrl(email: string): string {
  return `mailto:${email}`;
}
