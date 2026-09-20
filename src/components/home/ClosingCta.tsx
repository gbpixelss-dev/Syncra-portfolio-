import { Container } from "@/components/ui/Container";
import { StartProjectButton } from "@/components/layout/StartProjectButton";

export function ClosingCta() {
  return (
    <section className="bg-deep-sea-dark">
      <Container className="py-16 text-center sm:py-24">
        <h2 className="text-3xl font-semibold text-steam sm:text-4xl">
          Tell us what you&apos;re building.
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-steam">
          Whatever mix of development, design, video, or automation your
          project needs, we&apos;re ready to start the conversation.
        </p>
        <div className="mt-8 flex justify-center">
          <StartProjectButton className="px-5 py-3 text-base" />
        </div>
      </Container>
    </section>
  );
}
