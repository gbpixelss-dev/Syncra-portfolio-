import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PublishBadge } from "@/components/admin/PublishBadge";

export const metadata: Metadata = {
  title: "Services",
  robots: { index: false, follow: false },
};

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Services</h1>
        <Link
          href="/admin/services/new"
          className="rounded bg-deep-sea px-4 py-2 text-sm font-medium text-steam hover:bg-deep-sea-dark"
        >
          New service
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="mt-6 text-muted">No services yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-rule text-muted">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Slug</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Updated</th>
                <th className="py-2 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-rule">
                  <td className="py-3 pr-4 text-ink">{service.name}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-muted">
                    {service.slug}
                  </td>
                  <td className="py-3 pr-4">
                    <PublishBadge published={service.published} />
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    {service.updatedAt.toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="font-medium text-deep-sea hover:text-deep-sea-dark"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
