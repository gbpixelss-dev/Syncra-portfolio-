import { Container } from "@/components/ui/Container";
import { getGalleryMedia, type ProjectSummary } from "@/content/projects";
import { ProjectMedia } from "./ProjectMedia";

/**
 * Renders whatever remains after the hero media — omitted entirely
 * when there's nothing left to show (e.g. a project with only one
 * media item). Supports any number of items without a redesign.
 */
export function ProjectMediaGallery({ project }: { project: ProjectSummary }) {
  const gallery = getGalleryMedia(project);

  if (gallery.length === 0) {
    return null;
  }

  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <h2 className="annotation uppercase">Gallery</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {gallery.map((media, index) => (
            <ProjectMedia key={index} media={media} title={project.title} />
          ))}
        </div>
      </Container>
    </section>
  );
}
