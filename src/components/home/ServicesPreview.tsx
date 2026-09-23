import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPublishedServices } from "@/content/services";

const icons = [
  // Web Development
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />
  </svg>,

  // Graphic Design
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="16" r="1.5" fill="currentColor" />
  </svg>,

  // Content Creation
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
  </svg>,

  // AI
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
  </svg>,

  // Automation
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h8M13 12h8" />
    <circle cx="12" cy="12" r="2" />
    <path d="m9 9 3-3 3 3M9 15l3 3 3-3" />
  </svg>,

  // Default
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2 3 7l9 5 9-5-9-5ZM3 17l9 5 9-5" />
    <path d="M3 12l9 5 9-5" />
  </svg>,
];

export async function ServicesPreview() {
  const services = await getPublishedServices();

  return (
    <section className="relative overflow-hidden bg-[#050816]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
      </div>

      <Container className="relative py-20 sm:py-28">
        <div className="fade-up text-center">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-300">
            Our Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
            Everything your brand needs.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-slate-300">
            Development, design, content creation and automation working
            together as one premium digital system—not separate vendors stitched
            together.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className={`glass-card fade-up p-0 ${
                index === 1
                  ? "fade-delay-1"
                  : index === 2
                    ? "fade-delay-2"
                    : ""
              }`}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between rounded-[28px] p-7"
              >
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(46,197,255,.35)]">
                    <div className="h-7 w-7">
                      {icons[index] ?? icons[5]}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-300">
                    {service.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {service.description}
                  </p>
                </div>

                <span className="mt-8 inline-flex items-center gap-2 text-cyan-300 transition group-hover:translate-x-2">
                  View service

                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
