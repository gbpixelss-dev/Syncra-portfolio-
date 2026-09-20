"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_LINKS } from "@/lib/admin-navigation";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="space-y-1">
      {ADMIN_NAV_LINKS.map((link) => {
        // Exact match for the dashboard root; prefix match for
        // everything else so /admin/projects/[id] still highlights
        // "Projects".
        const isActive =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`block rounded px-3 py-2 text-sm font-medium ${
              isActive
                ? "bg-deep-sea text-steam"
                : "text-ink hover:bg-steam"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
