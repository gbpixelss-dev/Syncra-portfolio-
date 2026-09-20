"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Shared nav link used by both desktop and mobile navigation.
 *
 * Active state is never communicated by color alone: the current
 * page also gets a visible underline and `aria-current="page"`, so
 * the state reads correctly with reduced contrast and to assistive
 * technology.
 */
export function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`relative py-1 text-ink transition-colors hover:text-deep-sea ${
        isActive ? "text-deep-sea" : ""
      } ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute -bottom-0.5 left-0 h-px w-full bg-deep-sea transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}
