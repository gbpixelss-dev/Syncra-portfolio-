import { Container } from "@/components/ui/Container";
import { ServiceCta } from "./ServiceCta";
import type { ServiceSummary } from "@/content/services";

export function ServiceDetailHero({ service }: { service: ServiceSummary }) {
  return (
    <section className="bg-steam">
      <Container className="py-16 sm:py-24">
        <p className="annotation">Service</p>
        <h1 className="mt-2 text-4xl font-semibold text-ink sm:text-5xl">
          {service.name}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-muted">
          {service.description}
        </p>
        <div className="mt-8">
          <ServiceCta />
        </div>
      </Container>
    </section>
  );
}
