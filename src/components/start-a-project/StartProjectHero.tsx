"use client";

import Link from "next/link";

export function StartProjectHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 sm:pb-32 sm:pt-36">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/8 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">
            Premium Digital Agency
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-[1.05] text-white sm:text-7xl">
            We build digital experiences people actually remember.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Websites, branding, content creation and automation crafted as one
            premium system—not disconnected services from different vendors.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#project-form"
              className="rounded-full bg-cyan-400 px-8 py-4 font-semibold text-[#04111f] transition hover:scale-105 hover:shadow-[0_0_35px_rgba(46,197,255,.35)]"
            >
              Start a Project
            </a>

            <Link
              href="/portfolio"
              className="rounded-full border border-white/12 bg-white/5 px-8 py-4 text-white backdrop-blur-xl transition hover:border-cyan-400/35 hover:bg-white/8"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Floating Glass Preview */}
        <div className="mt-20 hidden lg:block">
          <div className="glass-card mx-auto max-w-5xl p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                  Live Preview
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Luxury Digital Experience
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
                "Web Development",
                "Graphic Design",
                "Content Creation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="mb-4 h-10 w-10 rounded-xl bg-cyan-400/10" />
                  <h4 className="text-lg font-semibold text-white">{item}</h4>
                  <p className="mt-2 text-sm text-slate-300">
                    Premium execution with a luxury digital finish.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
