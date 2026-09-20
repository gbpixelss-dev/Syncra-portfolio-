import { cache } from "react";
import { prisma } from "@/lib/db";

/**
 * DATA SOURCE — Phase 8. The database (Project table + its relations)
 * is now the source of truth. No real project data exists yet, so
 * the fallback is an empty array — never fabricated projects.
 *
 * Returned objects are intentionally DENORMALIZED (service/technology
 * NAMES resolved alongside their slugs) so that display components —
 * including client components like PortfolioBrowser, which cannot
 * make their own database calls — never need to separately look up
 * a Service/Technology record just to render a label.
 */

export type ProjectMediaType = "IMAGE" | "VIDEO" | "EMBED";

export type ProjectMedia = {
  type: ProjectMediaType;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  order: number;
  isHero: boolean;
};

export type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  description: string;
  client?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  process?: string;
  results?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  serviceSlugs: readonly string[];
  serviceNames: readonly string[];
  technologySlugs: readonly string[];
  technologyNames: readonly string[];
  media: readonly ProjectMedia[];
};

const FALLBACK_PROJECTS: readonly ProjectSummary[] = [];

type ProjectRow = Awaited<ReturnType<typeof fetchPublishedRows>>[number];

async function fetchPublishedRows() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: {
      services: { include: { service: true } },
      technologies: { include: { technology: true } },
      media: { orderBy: { order: "asc" } },
    },
  });
}

function toSummary(row: ProjectRow): ProjectSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.summary,
    client: row.client ?? undefined,
    overview: row.overview ?? undefined,
    challenge: row.challenge ?? undefined,
    solution: row.solution ?? undefined,
    process: row.process ?? undefined,
    results: row.results ?? undefined,
    liveUrl: row.liveUrl ?? undefined,
    featured: row.featured,
    order: row.order,
    serviceSlugs: row.services.map((s) => s.service.slug),
    serviceNames: row.services.map((s) => s.service.name),
    technologySlugs: row.technologies.map((t) => t.technology.slug),
    technologyNames: row.technologies.map((t) => t.technology.name),
    media: row.media.map((m) => ({
      type: m.type as ProjectMediaType,
      url: m.url,
      thumbnailUrl: m.thumbnailUrl ?? undefined,
      alt: m.alt ?? undefined,
      caption: m.caption ?? undefined,
      order: m.order,
      isHero: m.isHero,
    })),
  };
}

export const getPublishedProjects = cache(
  async (): Promise<readonly ProjectSummary[]> => {
    try {
      const rows = await fetchPublishedRows();
      return rows.map(toSummary);
    } catch {
      return FALLBACK_PROJECTS;
    }
  }
);

export const getFeaturedProjects = cache(
  async (): Promise<readonly ProjectSummary[]> => {
    const all = await getPublishedProjects();
    return all.filter((project) => project.featured);
  }
);

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectSummary | undefined> => {
    // Only published projects are ever resolvable here — a draft
    // project (unconfirmed reference or otherwise) behaves exactly
    // like an unknown slug to every public consumer.
    const all = await getPublishedProjects();
    return all.find((project) => project.slug === slug);
  }
);

export const getProjectsByServiceSlug = cache(
  async (serviceSlug: string): Promise<readonly ProjectSummary[]> => {
    const all = await getPublishedProjects();
    return all.filter((project) => project.serviceSlugs.includes(serviceSlug));
  }
);

export function getHeroMedia(project: ProjectSummary): ProjectMedia | undefined {
  return (
    project.media.find((media) => media.isHero) ??
    [...project.media].sort((a, b) => a.order - b.order)[0]
  );
}

export function getGalleryMedia(project: ProjectSummary): readonly ProjectMedia[] {
  const hero = getHeroMedia(project);
  return project.media
    .filter((media) => media !== hero)
    .slice()
    .sort((a, b) => a.order - b.order);
}

/** {slug, name} pairs for technologies actually used by at least one
 *  published project — drives the Portfolio technology filter, which
 *  stays hidden when this is empty. */
export const getTechnologiesInUse = cache(
  async (): Promise<readonly { slug: string; name: string }[]> => {
    const all = await getPublishedProjects();
    const seen = new Map<string, string>();
    for (const project of all) {
      project.technologySlugs.forEach((slug, i) => {
        seen.set(slug, project.technologyNames[i]);
      });
    }
    return [...seen.entries()].map(([slug, name]) => ({ slug, name }));
  }
);

export const getAdjacentProjects = cache(
  async (
    slug: string
  ): Promise<{ previous?: ProjectSummary; next?: ProjectSummary }> => {
    const published = await getPublishedProjects();
    const index = published.findIndex((project) => project.slug === slug);
    if (index === -1 || published.length <= 1) return {};
    return {
      previous: index > 0 ? published[index - 1] : undefined,
      next: index < published.length - 1 ? published[index + 1] : undefined,
    };
  }
);
