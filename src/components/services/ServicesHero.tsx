import { Container } from "@/components/ui/Container";

export function ServicesHero() {
  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
          Services
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted">
          Multiple digital disciplines, coordinated by one team.
        </p>
      </Container>
    </section>
  );
}
