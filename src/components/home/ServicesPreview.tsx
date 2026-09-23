
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getPublishedServices } from "@/content/services";

export async function ServicesPreview() {
  const services = await getPublishedServices();

  return (
    <section className="relative overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 hero-grid opacity-[0.05]" />
      <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

      <Container className="relative py-20 sm:py-28">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              WHAT WE DO
            </span>

            <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
              Everything your brand needs in one place.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Development, design, content creation and automation working
              together instead of feeling like different vendors stitched into
              one project.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.08}>
              <Link
                href={`/services/${service.slug}`}
                className="group block rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(0,188,255,.18)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/20 transition group-hover:scale-110 group-hover:bg-cyan-400/20">
                  <div className="h-6 w-6 rounded-md bg-cyan-300" />
                </div>

                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300">
                  {service.name}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-cyan-300 opacity-70 transition group-hover:gap-3 group-hover:opacity-100">
                  <span className="text-sm">Explore</span>
                  <span>→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
