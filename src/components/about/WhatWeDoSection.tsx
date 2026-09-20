import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPublishedServices } from "@/content/services";

/**
 * References the canonical six-service data (names + links only) —
 * intentionally not the full ServicesList/ServiceItem components,
 * to avoid duplicating the /services page here.
 */
export async function WhatWeDoSection() {
  const services = await getPublishedServices();
  return (
    <section>
      <Container className="py-16 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-4 text-muted">
            A typical project touches more than one discipline: a website
            needs design before it needs code, a brand needs visuals before
            it needs an audience, a workflow often needs automation once the
            manual version starts costing time. SYNCra handles web and
            software development, graphic design, UI/UX design, video
            production and editing, AI and automation, and social media
            management — not as six separate services you shop between, but
            as the range one team draws on, depending on what a project
            actually calls for.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="rounded border border-rule px-3 py-1.5 text-sm text-ink hover:border-deep-sea hover:text-deep-sea"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
