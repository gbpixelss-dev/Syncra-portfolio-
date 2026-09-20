import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DashboardStats } from "@/components/admin/DashboardStats";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const QUICK_ACTIONS = [
  { label: "New project", href: "/admin/projects/new" },
  { label: "Manage projects", href: "/admin/projects" },
  { label: "Manage services", href: "/admin/services" },
  { label: "Manage technologies", href: "/admin/technologies" },
  { label: "Manage testimonials", href: "/admin/testimonials" },
  { label: "Settings", href: "/admin/settings" },
] as const;

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Dashboard</h1>

      <div className="mt-6">
        <Suspense fallback={<p className="text-muted">Loading…</p>}>
          <DashboardStats />
        </Suspense>
      </div>

      <div className="mt-10">
        <h2 className="annotation uppercase">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded border border-rule px-3 py-1.5 text-sm text-ink hover:border-deep-sea hover:text-deep-sea"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
