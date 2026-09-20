import type { ProjectSummary } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function PortfolioGrid({ projects }: { projects: readonly ProjectSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
