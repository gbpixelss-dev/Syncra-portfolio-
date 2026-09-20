import type { ProjectSummary } from "@/content/projects";
import { ProjectDetailHero } from "./ProjectDetailHero";
import { ProjectMetadata } from "./ProjectMetadata";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { ProjectMediaGallery } from "./ProjectMediaGallery";
import { ProjectCta } from "./ProjectCta";
import { ProjectNavigation } from "./ProjectNavigation";

/**
 * Single reusable template driving every /portfolio/[slug] page.
 * Locked order: hero media → metadata strip → case study (only
 * populated sections) → gallery (only remaining media) → CTA →
 * previous/next.
 */
export function ProjectDetail({ project }: { project: ProjectSummary }) {
  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectMetadata project={project} />
      <ProjectCaseStudy project={project} />
      <ProjectMediaGallery project={project} />
      <ProjectCta />
      <ProjectNavigation slug={project.slug} />
    </>
  );
}
