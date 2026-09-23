import Link from "next/link";

export function Footer() {
  const socials = [
    { name: "Instagram", href: "#" },
    { name: "TikTok", href: "#" },
    { name: "WhatsApp", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#040714]">
      <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            Ready when you are
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-6xl">
            Let's build something unforgettable.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Whether it's a website, brand identity, content strategy or automation,
            let's create work that actually leaves an impression.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/start-a-project"
              className="rounded-full bg-cyan-400 px-8 py-4 font-semibold text-[#04111f] transition hover:scale-105 hover:shadow-[0_0_30px_rgba(46,197,255,.35)]"
            >
              Start a Project
            </Link>

            <a
              href="mailto:syncradigitalagency@gmail.com"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-white backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/8"
            >
              Email Us
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="glass-card rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Email
            </p>
            <p className="mt-3 text-white">
              syncradigitalagency@gmail.com
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Location
            </p>
            <p className="mt-3 text-white">
              Lagos, Nigeria
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Availability
            </p>
            <p className="mt-3 text-white">
              Open for freelance & agency projects.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-white/8 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              SYNCra Digital Agency
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Premium digital experiences with a luxury finish.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SYNCra Digital Agency. Built with precision.
        </div>
      </div>
    </footer>
  );
}
