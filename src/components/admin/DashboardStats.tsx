import Link from "next/link";
import { prisma } from "@/lib/db";

const STAT_LINKS = [
  { key: "publishedProjects", label: "Published projects", href: "/admin/projects" },
  { key: "draftProjects", label: "Draft projects", href: "/admin/projects" },
  { key: "services", label: "Services", href: "/admin/services" },
  { key: "technologies", label: "Technologies", href: "/admin/technologies" },
  { key: "publishedTestimonials", label: "Published testimonials", href: "/admin/testimonials" },
  { key: "totalInquiries", label: "Total inquiries", href: "/admin/inquiries" },
  { key: "newInquiries", label: "New inquiries", href: "/admin/inquiries?status=NEW" },
] as const;

/**
 * Every number here is a real Prisma count() against the current
 * database state — never a fabricated/placeholder figure. On a fresh
 * database every count is honestly 0, which is the correct state to
 * show, not something to paper over.
 */
export async function DashboardStats() {
  let counts: Record<(typeof STAT_LINKS)[number]["key"], number> | null = null;

  try {
    const [
      publishedProjects,
      draftProjects,
      services,
      technologies,
      publishedTestimonials,
      totalInquiries,
      newInquiries,
    ] = await Promise.all([
      prisma.project.count({ where: { published: true } }),
      prisma.project.count({ where: { published: false } }),
      prisma.service.count(),
      prisma.technology.count(),
      prisma.testimonial.count({ where: { published: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
    ]);

    counts = {
      publishedProjects,
      draftProjects,
      services,
      technologies,
      publishedTestimonials,
      totalInquiries,
      newInquiries,
    };
  } catch {
    // Database not yet reachable (e.g. DATABASE_URL/DIRECT_URL not
    // configured yet). Fail honestly rather than showing fabricated
    // numbers or crashing the whole admin panel.
    return (
      <div className="rounded border border-rule bg-steam p-6">
        <p className="text-ink">Unable to connect to the database.</p>
        <p className="mt-1 text-sm text-muted">
          Check that DATABASE_URL and DIRECT_URL are configured correctly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STAT_LINKS.map((stat) => (
        <Link
          key={stat.key}
          href={stat.href}
          className="rounded border border-rule p-6 hover:border-deep-sea"
        >
          <p className="annotation uppercase">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold text-ink">
            {counts[stat.key]}
          </p>
        </Link>
      ))}
    </div>
  );
}
