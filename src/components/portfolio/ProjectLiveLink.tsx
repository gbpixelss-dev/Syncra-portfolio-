export function ProjectLiveLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-deep-sea hover:text-deep-sea-dark"
    >
      View live project
      <span aria-hidden="true">↗</span>
    </a>
  );
}
