import { Container } from "@/components/ui/Container";

export function StartProjectHero() {
  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
          Start a Project
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted">
          Tell us what you&apos;re building — we&apos;ll get back to you to
          talk it through.
        </p>
      </Container>
    </section>
  );
}
