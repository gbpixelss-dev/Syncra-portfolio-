import { cache } from "react";
import { prisma } from "@/lib/db";
import { getProjectsByServiceSlug } from "./projects";

/**
 * DATA SOURCE — Phase 8. The database (Technology table) is the
 * source of truth. No verified technologies exist yet, so the
 * fallback is empty — never a guessed/generic tech list.
 *
 * There is no direct Service<->Technology relation in the schema —
 * "which technologies are relevant to a service" is derived from the
 * technologies actually used by that service's published projects
 * (Service -> Project -> Technology), matching the approved
 * Node-System relationship chain rather than duplicating a second,
 * redundant relationship.
 */
export type TechnologySummary = {
  id?: string;
  name: string;
  slug: string;
  category: string;
};

const FALLBACK_TECHNOLOGIES: readonly TechnologySummary[] = [];

export const getTechnologies = cache(
  async (): Promise<readonly TechnologySummary[]> => {
    try {
      const rows = await prisma.technology.findMany({
        orderBy: { name: "asc" },
      });
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        category: row.category,
      }));
    } catch {
      return FALLBACK_TECHNOLOGIES;
    }
  }
);

export const getTechnologyBySlug = cache(
  async (slug: string): Promise<TechnologySummary | undefined> => {
    const technologies = await getTechnologies();
    return technologies.find((tech) => tech.slug === slug);
  }
);

export const getTechnologiesByServiceSlug = cache(
  async (
    serviceSlug: string
  ): Promise<readonly { slug: string; name: string }[]> => {
    const projects = await getProjectsByServiceSlug(serviceSlug);
    const seen = new Map<string, string>();
    for (const project of projects) {
      project.technologySlugs.forEach((slug, i) => {
        seen.set(slug, project.technologyNames[i]);
      });
    }
    return [...seen.entries()].map(([slug, name]) => ({ slug, name }));
  }
);
