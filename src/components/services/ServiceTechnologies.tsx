import { Container } from "@/components/ui/Container";
import { getTechnologiesByServiceSlug } from "@/content/technologies";

/**
 * Data-aware: renders nothing when no verified technology is
 * associated with this service, per the locked rule against a
 * fabricated technology wall.
 */
export async function ServiceTechnologies({ serviceSlug }: { serviceSlug: string }) {
  const technologies = await getTechnologiesByServiceSlug(serviceSlug);

  if (technologies.length === 0) {
    return null;
  }

  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <h2 className="annotation uppercase">Relevant technologies</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <li
              key={tech.name}
              className="rounded border border-rule bg-surface px-3 py-1 font-mono text-sm text-ink"
            >
              {tech.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
