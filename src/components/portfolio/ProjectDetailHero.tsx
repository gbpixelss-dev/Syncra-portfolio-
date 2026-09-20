import { Container } from "@/components/ui/Container";
import { getHeroMedia, type ProjectSummary } from "@/content/projects";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectDetailHero({ project }: { project: ProjectSummary }) {
  const hero = getHeroMedia(project);

  return (
    <section className="bg-steam">
      <Container className="py-10 sm:py-14">
        {hero ? (
          <ProjectMedia media={hero} title={project.title} />
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center rounded border border-rule bg-surface">
            <span className="annotation">{project.title}</span>
          </div>
        )}
      </Container>
    </section>
  );
}
