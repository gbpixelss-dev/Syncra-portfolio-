"use client";

export function StartProjectHero() {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      {/* Moving Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="hero-grid absolute inset-0" />
      </div>

      {/* Glow Orbs */}
      <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />
      <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-blue-500/20 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
        <div className="max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(46,197,255,.08)]">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs tracking-[0.25em] text-cyan-300 uppercase">
            SYNCra Digital Agency
          </span>

          <h1 className="mt-6 hero-title text-4xl font-bold leading-tight sm:text-6xl">
            We build digital experiences people remember.
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Websites, branding, content creation, automation and creative
            systems designed to make businesses look premium.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#project-form"
              className="group inline-flex items-center rounded-full bg-cyan-400 px-7 py-4 font-semibold text-[#04111f] transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(46,197,255,.45)]"
            >
              Start a Project
              <span className="ml-2 transition group-hover:translate-x-1">→</span>
            </a>

            <a
              href="/portfolio"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-4 font-medium backdrop-blur-md transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
