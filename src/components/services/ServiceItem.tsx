import Link from "next/link";
import type { ServiceSummary } from "@/content/services";

/**
 * A single service in the /services list. The leading number is
 * structural sequence notation (01, 02, ...), never a disguised
 * statistic — per the locked rule against fake "01 / 500+ PROJECTS"
 * style annotations.
 */
export function ServiceItem({
  service,
  index,
}: {
  service: ServiceSummary;
  index: number;
}) {
  return (
    <li className="border-b border-rule">
      <Link
        href={`/services/${service.slug}`}
        className="group grid grid-cols-[auto_1fr_auto] items-start gap-6 py-8 sm:items-center"
      >
        <span className="annotation pt-1 text-base sm:pt-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h2 className="text-2xl font-medium text-ink group-hover:text-deep-sea sm:text-3xl">
            {service.name}
          </h2>
          <p className="mt-2 max-w-prose text-muted">{service.description}</p>
        </div>
        <span
          aria-hidden="true"
          className="annotation hidden text-deep-sea opacity-0 transition-opacity group-hover:opacity-100 sm:inline-block"
        >
          View service
        </span>
      </Link>
    </li>
  );
}
