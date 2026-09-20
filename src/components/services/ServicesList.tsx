import { Container } from "@/components/ui/Container";
import { getPublishedServices } from "@/content/services";
import { ServiceItem } from "./ServiceItem";

export async function ServicesList() {
  const services = await getPublishedServices();

  return (
    <section>
      <Container className="py-16 sm:py-24">
        <ul className="border-t border-rule">
          {services.map((service, index) => (
            <ServiceItem key={service.slug} service={service} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
