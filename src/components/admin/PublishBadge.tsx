export function PublishBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
        published ? "bg-deep-sea text-steam" : "bg-rule text-ink"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}
