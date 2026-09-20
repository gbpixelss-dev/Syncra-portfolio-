import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: appUrl ? `${appUrl}/sitemap.xml` : undefined,
  };
}
