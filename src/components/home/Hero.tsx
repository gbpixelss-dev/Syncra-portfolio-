import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { StartProjectButton } from "@/components/layout/StartProjectButton";

/**
 * Hero visual: the approved direction calls for a composition of real
 * project fragments. No published project media exists yet (Phase 7
 * CMS), so this renders a restrained Blueprint-language structural
 * placeholder instead — empty framed panels with real, honest labels
 * ("Selected work — in progress"), never fabricated screenshots,
 * project names, or metadata. This is replaced with real project
 * media in a later phase, not redesigned.
 */
function HeroVisual() {
  return (
    <div
      className="relative grid grid-cols-3 gap-3 sm:gap-4"
      aria-hidden="true"
    >
      <div className="col-span-2 row-span-2 aspect-[4/3] rounded border border-rule bg-steam" />
      <div className="aspect-square rounded border border-rule bg-steam" />
      <div className="aspect-square rounded border border-rule bg-steam" />
      <p className="annotation col-span-3 mt-1">
        Selected work — in progress
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-steam">
      <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32">
        <div>
          <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            One team, every discipline your project actually needs.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted">
            SYNCra is a multidisciplinary digital agency based in Lagos,
            Nigeria. We design, build, and automate — so the different
            parts of your project are handled by one coordinated team,
            instead of being split across vendors who each only see their
            own piece of it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <StartProjectButton className="px-5 py-3 text-base" />
            <Link
              href="/portfolio"
              className="text-base font-medium text-ink underline decoration-rule underline-offset-4 hover:text-deep-sea hover:decoration-deep-sea"
            >
              View Our Work
            </Link>
          </div>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}
