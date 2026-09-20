import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPublishedServices } from "@/content/services";

export async function ServicesPreview() {
  const services = await getPublishedServices();
  return (
    <section>
      <Container className="py-16 sm:py-24">
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
          What do you need?
        </h2>
        <p className="mt-4 max-w-prose text-muted">
          At SYNCra, development, design, video, and automation aren&apos;t
          separate businesses handed off between — they&apos;re disciplines
          the same team works across, so the pieces of your project fit
          together instead of being stitched from different vendors.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="bg-surface">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between p-6 hover:bg-steam"
              >
                <div>
                  <h3 className="text-lg font-medium text-ink group-hover:text-deep-sea">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {service.description}
                  </p>
                </div>
                <span className="annotation mt-6 inline-flex items-center gap-1 text-deep-sea opacity-0 transition-opacity group-hover:opacity-100">
                  View service
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
