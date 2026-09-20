import { Container } from "@/components/ui/Container";
import type { ProjectSummary } from "@/content/projects";
import { ProjectLiveLink } from "./ProjectLiveLink";

export function ProjectMetadata({ project }: { project: ProjectSummary }) {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
        {project.title}
      </h1>
      {project.description && (
        <p className="mt-4 max-w-prose text-lg text-muted">
          {project.description}
        </p>
      )}

      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
        {project.client && (
          <div>
            <dt className="annotation uppercase">Client</dt>
            <dd className="mt-1 text-ink">{project.client}</dd>
          </div>
        )}
        {project.serviceNames.length > 0 && (
          <div>
            <dt className="annotation uppercase">Services</dt>
            <dd className="mt-1 text-ink">{project.serviceNames.join(", ")}</dd>
          </div>
        )}
        {project.technologyNames.length > 0 && (
          <div>
            <dt className="annotation uppercase">Technologies</dt>
            <dd className="mt-1 text-ink">
              {project.technologyNames.join(", ")}
            </dd>
          </div>
        )}
      </dl>

      {project.liveUrl && (
        <div className="mt-6">
          <ProjectLiveLink url={project.liveUrl} />
        </div>
      )}
    </Container>
  );
}
