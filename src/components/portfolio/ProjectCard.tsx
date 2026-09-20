import Link from "next/link";
import type { ProjectSummary } from "@/content/projects";
import { ProjectThumbnail } from "./ProjectThumbnail";

export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <ProjectThumbnail project={project} />
      <h3 className="mt-4 text-lg font-medium text-ink group-hover:text-deep-sea">
        {project.title}
      </h3>
      {project.description && (
        <p className="mt-1 text-sm text-muted">{project.description}</p>
      )}
      {(project.serviceNames.length > 0 || project.technologyNames.length > 0) && (
        <p className="annotation mt-2">
          {[...project.serviceNames, ...project.technologyNames].join(" · ")}
        </p>
      )}
    </Link>
  );
}
