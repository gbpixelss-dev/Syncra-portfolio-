import { Container } from "@/components/ui/Container";
import type { ServiceSummary } from "@/content/services";

export function ServiceCapabilities({ service }: { service: ServiceSummary }) {
  return (
    <section>
      <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <h2 className="annotation uppercase">Capabilities</h2>
          <ul className="mt-4 space-y-2">
            {service.capabilities.map((capability) => (
              <li key={capability} className="text-lg text-ink">
                {capability}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="annotation uppercase">Project types</h2>
          <ul className="mt-4 space-y-2">
            {service.exampleProjectTypes.map((type) => (
              <li key={type} className="text-muted">
                {type}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
