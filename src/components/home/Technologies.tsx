import { Container } from "@/components/ui/Container";
import { getTechnologies } from "@/content/technologies";

/**
 * Data-aware, same pattern as SelectedProjects: no verified
 * technology inventory exists yet, so this renders nothing rather
 * than a fabricated logo wall or invented stack. Grouping by
 * category (not a flat list, and never a logo-count claim) is
 * already wired up for when real data lands.
 */
export async function Technologies() {
  const technologies = await getTechnologies();
  if (technologies.length === 0) {
    return null;
  }

  const grouped = technologies.reduce<Record<string, string[]>>(
    (acc, tech) => {
      acc[tech.category] = [...(acc[tech.category] ?? []), tech.name];
      return acc;
    },
    {}
  );

  return (
    <section>
      <Container className="py-16 sm:py-24">
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
          Technologies
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([category, names]) => (
            <div key={category}>
              <h3 className="annotation uppercase">{category}</h3>
              <p className="mt-2 text-ink">{names.join(", ")}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
