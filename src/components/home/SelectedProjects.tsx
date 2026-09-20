import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getFeaturedProjects } from "@/content/projects";
import { ProjectThumbnail } from "@/components/portfolio/ProjectThumbnail";
import type { ProjectSummary } from "@/content/projects";

/**
 * Data-aware: renders nothing at all when there are no published
 * featured projects, per the locked homepage behavior ("Featured
 * work" disappears entirely rather than showing empty/fake cards).
 */
export async function SelectedProjects() {
  const projects = await getFeaturedProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <section>
      <Container className="py-16 sm:py-24">
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
          Selected projects
        </h2>
        <p className="mt-4 max-w-prose text-muted">
          A look at some of the work we&apos;ve delivered.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <Link
          href="/portfolio"
          className="mt-10 inline-block text-sm font-medium text-deep-sea hover:text-deep-sea-dark"
        >
          View full portfolio
        </Link>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <ProjectThumbnail project={project} />
      <h3 className="mt-4 text-lg font-medium text-ink group-hover:text-deep-sea">
        {project.title}
      </h3>
      {project.serviceNames.length > 0 && (
        <p className="annotation mt-1">{project.serviceNames.join(" · ")}</p>
      )}
    </Link>
  );
}
