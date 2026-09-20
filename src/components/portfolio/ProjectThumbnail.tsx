import Image from "next/image";
import { getHeroMedia, type ProjectSummary } from "@/content/projects";

/**
 * Renders a project's hero media appropriately for its type, or a
 * restrained Blueprint-style empty frame when no media exists yet —
 * never a stock photo or invented image. Shared by the homepage,
 * service pages, and portfolio so the same project always looks the
 * same everywhere it appears.
 */
export function ProjectThumbnail({ project }: { project: ProjectSummary }) {
  const hero = getHeroMedia(project);

  if (!hero) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded border border-rule bg-steam">
        <span className="annotation">{project.title}</span>
      </div>
    );
  }

  if (hero.type === "IMAGE") {
    return (
      <div className="aspect-[4/3] overflow-hidden rounded border border-rule bg-steam">
        <Image
          src={hero.url}
          alt={hero.alt ?? project.title}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  // VIDEO or EMBED — use the supplied thumbnail if there is one,
  // otherwise a labeled placeholder frame (never a fabricated frame
  // grab or stock image).
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded border border-rule bg-steam">
      {hero.thumbnailUrl ? (
        <Image
          src={hero.thumbnailUrl}
          alt={hero.alt ?? project.title}
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="annotation absolute inset-0 flex items-center justify-center">
          {project.title}
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 rounded bg-deep-sea-dark px-2 py-0.5 font-mono text-xs text-steam"
      >
        Video
      </span>
    </div>
  );
}
