import type { MetadataRoute } from "next";
import { getPublishedServices } from "@/content/services";
import { getPublishedProjects } from "@/content/projects";

/**
 * Dynamic sitemap — static routes plus every currently published
 * service and project slug, pulled from the same DB-backed (with
 * resilient fallback) data layer the pages themselves use. Admin
 * routes are never included here — see robots.ts for why they're
 * disallowed entirely.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";

  const [services, projects] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${appUrl}/`, priority: 1 },
    { url: `${appUrl}/services`, priority: 0.8 },
    { url: `${appUrl}/portfolio`, priority: 0.8 },
    { url: `${appUrl}/about`, priority: 0.6 },
    { url: `${appUrl}/contact`, priority: 0.6 },
    { url: `${appUrl}/start-a-project`, priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${appUrl}/services/${service.slug}`,
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${appUrl}/portfolio/${project.slug}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
