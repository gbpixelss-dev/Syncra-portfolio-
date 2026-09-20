import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getProjectsByServiceSlug } from "@/content/projects";
import { ProjectThumbnail } from "@/components/portfolio/ProjectThumbnail";

export async function ServiceProjects({ serviceSlug }: { serviceSlug: string }) {
  const projects = await getProjectsByServiceSlug(serviceSlug);

  return (
    <section>
      <Container className="py-16 sm:py-24">
        <h2 className="annotation uppercase">Relevant work</h2>

        {projects.length === 0 ? (
          <p className="mt-4 text-muted">
            Projects in this discipline are on the way.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block"
              >
                <ProjectThumbnail project={project} />
                <h3 className="mt-4 text-lg font-medium text-ink group-hover:text-deep-sea">
                  {project.title}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
