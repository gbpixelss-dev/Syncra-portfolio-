import { Container } from "@/components/ui/Container";
import type { ServiceSummary } from "@/content/services";
import { ServiceDetailHero } from "./ServiceDetailHero";
import { ServiceCapabilities } from "./ServiceCapabilities";
import { ServiceTechnologies } from "./ServiceTechnologies";
import { ServiceProjects } from "./ServiceProjects";
import { ServiceCta } from "./ServiceCta";

/**
 * Single reusable template driving every /services/[slug] page from
 * canonical data — no per-service page markup is duplicated.
 */
export function ServiceDetail({ service }: { service: ServiceSummary }) {
  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceCapabilities service={service} />
      <ServiceTechnologies serviceSlug={service.slug} />
      <ServiceProjects serviceSlug={service.slug} />
      <section className="bg-deep-sea-dark">
        <Container className="flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <p className="text-xl font-medium text-steam">
            Ready to start a {service.name.toLowerCase()} project?
          </p>
          <ServiceCta />
        </Container>
      </section>
    </>
  );
}
