export function PortfolioSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor="portfolio-search" className="sr-only">
        Search projects
      </label>
      <input
        id="portfolio-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search projects"
        className="w-full rounded border border-rule bg-surface px-4 py-2 text-ink placeholder:text-muted focus-visible:border-deep-sea sm:w-64"
      />
    </div>
  );
}
