import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { SiteSettingsForm } from "@/components/admin/settings/SiteSettingsForm";
import { updateSiteSettings } from "./actions";
import { SOCIAL_PLATFORMS } from "@/lib/validation/site-settings";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findFirst({
    where: { singleton: true },
  });

  const socialLinks: Record<string, string> = {};
  if (settings?.socialLinks) {
    for (const link of settings.socialLinks as { platform: string; url: string }[]) {
      if (SOCIAL_PLATFORMS.includes(link.platform as (typeof SOCIAL_PLATFORMS)[number])) {
        socialLinks[link.platform] = link.url;
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Settings</h1>
      <div className="mt-6">
        <SiteSettingsForm
          action={updateSiteSettings}
          initialValues={{
            // Real, confirmed values remain the default until an
            // admin explicitly edits them — never invented.
            contactEmail: settings?.contactEmail ?? "syncradigitalagency@gmail.com",
            whatsapp: settings?.whatsapp ?? "08144624133",
            defaultSeoTitle: settings?.defaultSeoTitle ?? "",
            defaultSeoDescription: settings?.defaultSeoDescription ?? "",
            socialLinks,
          }}
        />
      </div>
    </div>
  );
}
