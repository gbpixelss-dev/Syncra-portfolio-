import type { ProjectSummary } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function PortfolioGrid({
  projects,
}: {
  projects: readonly ProjectSummary[];
}) {
  return (
    <section className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-[120px]" />
      </div>

      <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className={`fade-up ${
              index === 1
                ? "fade-delay-1"
                : index === 2
                  ? "fade-delay-2"
                  : ""
            }`}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
