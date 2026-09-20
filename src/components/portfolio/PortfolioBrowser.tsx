"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ServiceSummary } from "@/content/services";
import type { ProjectSummary } from "@/content/projects";
import { PortfolioSearch } from "./PortfolioSearch";
import { PortfolioFilters } from "./PortfolioFilters";
import { PortfolioGrid } from "./PortfolioGrid";
import { PortfolioNoResults } from "./PortfolioNoResults";
import { PortfolioEmptyState } from "./PortfolioEmptyState";

function matchesQuery(project: ProjectSummary, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();

  const haystack = [
    project.title,
    project.description,
    project.client ?? "",
    ...project.serviceNames,
    ...project.technologyNames,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function PortfolioBrowser({
  projects,
  services,
  technologiesInUse,
  initialService,
  initialTechnology,
  initialQuery,
}: {
  projects: readonly ProjectSummary[];
  services: readonly ServiceSummary[];
  technologiesInUse: readonly { slug: string; name: string }[];
  initialService: string;
  initialTechnology: string;
  initialQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const validServiceSlugs = useMemo(
    () => new Set(services.map((s) => s.slug)),
    [services]
  );
  const validTechnologySlugs = useMemo(
    () => new Set(technologiesInUse.map((t) => t.slug)),
    [technologiesInUse]
  );

  // Unknown filter values from the URL are safely ignored rather than
  // crashing or silently matching everything.
  const [serviceSlug, setServiceSlug] = useState(
    validServiceSlugs.has(initialService) ? initialService : ""
  );
  const [technologySlug, setTechnologySlug] = useState(
    validTechnologySlugs.has(initialTechnology) ? initialTechnology : ""
  );
  const [query, setQuery] = useState(initialQuery);

  // Keep the URL addressable/shareable, debounced so typing doesn't
  // spam history/navigation on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (serviceSlug) params.set("service", serviceSlug);
      if (technologySlug) params.set("technology", technologySlug);
      if (query.trim()) params.set("q", query.trim());
      const search = params.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [serviceSlug, technologySlug, query, pathname, router]);

  const filtered = useMemo(() => {
    return projects.filter(
      (project) =>
        (!serviceSlug || project.serviceSlugs.includes(serviceSlug)) &&
        (!technologySlug || project.technologySlugs.includes(technologySlug)) &&
        matchesQuery(project, query)
    );
  }, [projects, serviceSlug, technologySlug, query]);

  if (projects.length === 0) {
    return <PortfolioEmptyState />;
  }

  function resetFilters() {
    setServiceSlug("");
    setTechnologySlug("");
    setQuery("");
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-t border-rule py-6 sm:flex-row sm:items-center sm:justify-between">
        <PortfolioSearch value={query} onChange={setQuery} />
        <PortfolioFilters
          services={services}
          technologiesInUse={technologiesInUse}
          serviceSlug={serviceSlug}
          technologySlug={technologySlug}
          onServiceChange={setServiceSlug}
          onTechnologyChange={setTechnologySlug}
        />
      </div>

      {filtered.length === 0 ? (
        <PortfolioNoResults onReset={resetFilters} />
      ) : (
        <PortfolioGrid projects={filtered} />
      )}
    </div>
  );
}
