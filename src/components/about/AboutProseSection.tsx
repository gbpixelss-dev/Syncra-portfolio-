import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function AboutProseSection({
  heading,
  children,
  tinted = false,
}: {
  heading: string;
  children: ReactNode;
  tinted?: boolean;
}) {
  return (
    <section className={tinted ? "bg-steam" : undefined}>
      <Container className="py-16 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-4 space-y-4 text-muted">{children}</div>
        </div>
      </Container>
    </section>
  );
}
