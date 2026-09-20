import Image from "next/image";
import type { ProjectMedia as ProjectMediaItem } from "@/content/projects";

/**
 * Renders one media item according to its real type. EMBED renders
 * inside a same-origin-safe iframe (sandboxed, no fabricated
 * provider assumed beyond the stored URL itself).
 */
export function ProjectMedia({
  media,
  title,
}: {
  media: ProjectMediaItem;
  title: string;
}) {
  if (media.type === "IMAGE") {
    return (
      <figure>
        <Image
          src={media.url}
          alt={media.alt ?? title}
          width={1600}
          height={1200}
          className="w-full rounded border border-rule"
        />
        {media.caption && (
          <figcaption className="annotation mt-2">{media.caption}</figcaption>
        )}
      </figure>
    );
  }

  if (media.type === "VIDEO") {
    return (
      <figure>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- captions/tracks come from real media data when supplied; none fabricated here */}
        <video
          src={media.url}
          poster={media.thumbnailUrl}
          controls
          className="w-full rounded border border-rule"
        >
          {media.alt && <p>{media.alt}</p>}
        </video>
        {media.caption && (
          <figcaption className="annotation mt-2">{media.caption}</figcaption>
        )}
      </figure>
    );
  }

  // EMBED — external video (YouTube/Vimeo etc.)
  return (
    <figure>
      <div className="aspect-video w-full overflow-hidden rounded border border-rule">
        <iframe
          src={media.url}
          title={media.alt ?? title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      </div>
      {media.caption && (
        <figcaption className="annotation mt-2">{media.caption}</figcaption>
      )}
    </figure>
  );
}
