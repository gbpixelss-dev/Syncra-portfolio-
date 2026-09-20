import { Container } from "@/components/ui/Container";

export function AboutHero() {
  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
          About SYNCra
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted">
          A multidisciplinary digital agency based in Lagos, Nigeria.
        </p>
      </Container>
    </section>
  );
}
