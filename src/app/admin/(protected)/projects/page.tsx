import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PublishBadge } from "@/components/admin/PublishBadge";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded bg-deep-sea px-4 py-2 text-sm font-medium text-steam hover:bg-deep-sea-dark"
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 text-muted">No projects yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-rule text-muted">
                <th className="py-2 pr-4 font-medium">Title</th>
                <th className="py-2 pr-4 font-medium">Client</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Updated</th>
                <th className="py-2 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-rule">
                  <td className="py-3 pr-4 text-ink">
                    {project.title}
                    {project.featured && (
                      <span className="ml-2 annotation text-deep-sea">
                        featured
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    {project.client ?? "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <PublishBadge published={project.published} />
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    {project.updatedAt.toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/admin/projects/${project.id}`}
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
