import type { ServiceSummary } from "@/content/services";

export function PortfolioFilters({
  services,
  technologiesInUse,
  serviceSlug,
  technologySlug,
  onServiceChange,
  onTechnologyChange,
}: {
  services: readonly ServiceSummary[];
  technologiesInUse: readonly { slug: string; name: string }[];
  serviceSlug: string;
  technologySlug: string;
  onServiceChange: (slug: string) => void;
  onTechnologyChange: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label htmlFor="portfolio-service-filter" className="sr-only">
          Filter by service
        </label>
        <select
          id="portfolio-service-filter"
          value={serviceSlug}
          onChange={(event) => onServiceChange(event.target.value)}
          className="rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
        >
          <option value="">All services</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      {/* Technology is the secondary filter and stays hidden entirely
          when no published project actually uses a technology yet —
          never a dropdown of fabricated options. */}
      {technologiesInUse.length > 0 && (
        <div>
          <label htmlFor="portfolio-technology-filter" className="sr-only">
            Filter by technology
          </label>
          <select
            id="portfolio-technology-filter"
            value={technologySlug}
            onChange={(event) => onTechnologyChange(event.target.value)}
            className="rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
          >
            <option value="">All technologies</option>
            {technologiesInUse.map((tech) => (
              <option key={tech.slug} value={tech.slug}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
