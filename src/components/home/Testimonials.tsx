import { Container } from "@/components/ui/Container";
import { getPublishedTestimonials } from "@/content/testimonials";

/**
 * Testimonials are optional and data-dependent per the locked spec.
 * No real testimonials exist yet, so this renders nothing — never a
 * fabricated quote, name, or company.
 */
export async function Testimonials() {
  const testimonials = await getPublishedTestimonials();
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section>
      <Container className="py-16 sm:py-24">
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
          What clients say
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <blockquote key={index} className="border-l-2 border-deep-sea pl-6">
              <p className="text-ink">&ldquo;{testimonial.text}&rdquo;</p>
              <footer className="annotation mt-4">
                {testimonial.clientName}
                {testimonial.companyRole ? ` — ${testimonial.companyRole}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
