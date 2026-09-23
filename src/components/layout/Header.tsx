"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-cyan-400/15 bg-[#06101f]/70 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="SYNCra"
            width={44}
            height={44}
            priority
            className="h-10 w-auto transition duration-300 group-hover:drop-shadow-[0_0_18px_rgba(46,197,255,.65)]"
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-cyan-400/15 text-cyan-300 shadow-[0_0_20px_rgba(46,197,255,.25)]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/start-a-project"
            className="ml-3 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-[#04111f] transition hover:scale-105 hover:shadow-[0_0_30px_rgba(46,197,255,.45)]"
          >
            Start a Project
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur md:hidden"
        >
          <span
            className={`absolute h-0.5 w-5 bg-white transition ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-white transition ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-white transition ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#071221]/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 p-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 transition ${
                  pathname === link.href
                    ? "bg-cyan-400/15 text-cyan-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/start-a-project"
              className="mt-2 rounded-xl bg-cyan-400 px-4 py-3 text-center font-semibold text-[#04111f]"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
