
"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050816]">
      {/* Ambient Lighting */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[170px]" />
        <div className="absolute -right-24 top-1/3 h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute inset-0 hero-grid opacity-[0.06]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 sm:pb-32 sm:pt-44">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300 backdrop-blur-xl">
            SYNCRA DIGITAL AGENCY
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-[1.02] text-white sm:text-7xl">
            We build
            <span className="block bg-gradient-to-r from-cyan-300 via-white to-blue-400 bg-clip-text text-transparent">
              unforgettable
            </span>
            digital experiences.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Websites, branding, content creation and automation crafted with a
            luxury finish—not just another template.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/start-a-project"
              className="rounded-full bg-cyan-400 px-8 py-4 font-semibold text-[#04111f] transition hover:scale-105 hover:shadow-[0_0_35px_rgba(46,197,255,.35)]"
            >
              Start a Project →
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-white backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/8"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Floating Glass Showcase */}
        <div className="mt-20 hidden lg:block">
          <div className="glass-card mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Live System
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Premium Digital Stack
                </h3>
              </div>

              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { title: "Web Development", text: "Modern business websites." },
                { title: "Graphic Design", text: "Luxury visual identity." },
                { title: "Content Creation", text: "Videos that convert." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/30 hover:bg-white/8"
                >
                  <div className="mb-4 h-10 w-10 rounded-xl bg-cyan-400/10" />
                  <h4 className="text-lg font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
