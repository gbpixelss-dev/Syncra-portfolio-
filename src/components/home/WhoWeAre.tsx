import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function WhoWeAre() {
  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
            Who we are
          </h2>
          <p className="mt-4 text-muted">
            SYNCra is a multidisciplinary digital agency based in Lagos,
            Nigeria, with over five years of experience across development,
            design, video, and AI-driven automation. We work as one
            coordinated team, so a project doesn&apos;t get split across
            vendors who each only see their own part of it.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-medium text-deep-sea hover:text-deep-sea-dark"
          >
            About SYNCra
          </Link>
        </div>
      </Container>
    </section>
  );
}
