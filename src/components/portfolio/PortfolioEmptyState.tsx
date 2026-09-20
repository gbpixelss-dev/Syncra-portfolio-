import { StartProjectButton } from "@/components/layout/StartProjectButton";

/**
 * Zero published projects exist at all. Calm and honest — no
 * "coming soon", no implied timeline, no fake activity indicator.
 */
export function PortfolioEmptyState() {
  return (
    <div className="border-t border-rule py-16 text-center">
      <p className="text-lg text-muted">
        There are no published projects yet.
      </p>
      <p className="mt-2 text-muted">
        In the meantime, tell us about your project.
      </p>
      <div className="mt-6 flex justify-center">
        <StartProjectButton />
      </div>
    </div>
  );
}
