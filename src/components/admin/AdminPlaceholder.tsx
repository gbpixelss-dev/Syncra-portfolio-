/**
 * Honest placeholder for every CMS module whose full CRUD experience
 * is Phase 8 work. No fake records, no fake tables, no fake buttons
 * that don't do anything — just a clear, calm statement of what's
 * here and what's coming.
 */
export function AdminPlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      <div className="mt-6 rounded border border-rule bg-steam p-6">
        <p className="text-ink">
          {description ?? `${title} management is coming in Phase 8.`}
        </p>
      </div>
    </div>
  );
}
