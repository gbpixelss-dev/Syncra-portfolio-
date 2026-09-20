/**
 * Projects exist, but the current search/filter combination matches
 * none of them. Distinct from PortfolioEmptyState (zero projects
 * overall) — this always offers a reset.
 */
export function PortfolioNoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="border-t border-rule py-16 text-center">
      <p className="text-lg text-muted">
        No projects match these filters.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm font-medium text-deep-sea hover:text-deep-sea-dark"
      >
        Clear filters
      </button>
    </div>
  );
}
