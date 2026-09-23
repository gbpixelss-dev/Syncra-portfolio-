
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Start a Project", href: "/start-a-project" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-cyan-400/10 bg-[#071221]/75 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-lg font-bold text-cyan-300 transition group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(46,197,255,.45)]">
            S
          </div>

          <div>
            <p className="font-semibold tracking-wide text-white">SYNCra</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">
              DIGITAL AGENCY
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm transition ${
                  active ? "text-cyan-300" : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-cyan-300 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/start-a-project"
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-[#04111f] transition hover:scale-105 hover:shadow-[0_0_25px_rgba(46,197,255,.35)]"
          >
            Start a Project
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-xl lg:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          menuOpen ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#071221]/95 px-5 py-6 backdrop-blur-xl">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-cyan-300"
                    : "text-slate-300 hover:text-white"
                }
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/start-a-project"
              className="mt-2 rounded-full bg-cyan-400 px-6 py-3 text-center font-semibold text-[#04111f]"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
