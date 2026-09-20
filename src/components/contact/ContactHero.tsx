import { Container } from "@/components/ui/Container";

export function ContactHero() {
  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted">
          Reach SYNCra directly, or start a project when you&apos;re ready.
        </p>
      </Container>
    </section>
  );
}
