import { Container } from "@/components/ui/Container";
import { StartProjectButton } from "@/components/layout/StartProjectButton";

export function ProjectCta() {
  return (
    <section className="bg-deep-sea-dark">
      <Container className="flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <p className="text-xl font-medium text-steam">
          Start a project like this one.
        </p>
        <StartProjectButton className="px-5 py-3 text-base" />
      </Container>
    </section>
  );
}
