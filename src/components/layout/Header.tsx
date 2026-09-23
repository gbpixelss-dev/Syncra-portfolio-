"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Start a Project", href: "/start-a-project" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#071221]/70 border-b border-cyan-400/10 shadow-[0_10px_40px_rgba(0,0,0,.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="SYNCra"
            width={42}
            height={42}
            className="transition duration-500 group-hover:drop-shadow-[0_0_16px_rgba(46,197,255,.65)]"
          />

          <div className="hidden sm:block">
            <p className="text-white font-semibold tracking-wide">SYNCra</p>
            <p className="text-xs text-cyan-300 tracking-[0.25em]">
              DIGITAL AGENCY
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
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

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/start-a-project"
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-[#04111f] transition hover:scale-105 hover:shadow-[0_0_25px_rgba(46,197,255,.35)]"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          menuOpen ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#071221]/95 backdrop-blur-xl px-5 py-6">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base ${
                  pathname === link.href
                    ? "text-cyan-300"
                    : "text-slate-300 hover:text-white"
                }`}
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
