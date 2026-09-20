import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CEO } from "@/content/leadership";

/**
 * CEO photo slot: renders the real photo when `photoUrl` is set by a
 * future CMS. Until then, an honest structured media placeholder —
 * never a stock photo, generated person, or borrowed image — clearly
 * labeled as a placeholder, not announced to screen readers as a
 * photograph.
 */
function CeoPortrait() {
  if (CEO.photoUrl) {
    return (
      <Image
        src={CEO.photoUrl}
        alt={CEO.photoAlt ?? CEO.name}
        width={480}
        height={600}
        className="w-full rounded border border-rule object-cover"
      />
    );
  }

  return (
    <div
      className="flex aspect-[4/5] w-full items-center justify-center rounded border border-rule bg-steam"
      role="img"
      aria-label="CEO portrait placeholder — photograph not yet available"
    >
      <span className="annotation">CEO portrait</span>
    </div>
  );
}

export function LeadershipSection() {
  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <h2 className="annotation uppercase">Leadership</h2>

        <div className="mt-6 grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start lg:gap-16">
          <div className="max-w-xs">
            <CeoPortrait />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-ink sm:text-3xl">
              {CEO.name}
            </h3>
            <p className="mt-1 text-muted">{CEO.title}</p>

            <div className="mt-6 max-w-2xl space-y-4 text-ink">
              {CEO.bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
