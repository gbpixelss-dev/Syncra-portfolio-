import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { TechnologyForm } from "@/components/admin/technologies/TechnologyForm";
import { createTechnology } from "./actions";

export const metadata: Metadata = {
  title: "Technologies",
  robots: { index: false, follow: false },
};

export default async function AdminTechnologiesPage() {
  const technologies = await prisma.technology.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { projects: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Technologies</h1>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {technologies.length === 0 ? (
            <p className="text-muted">No technologies yet.</p>
          ) : (
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rule text-muted">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Category</th>
                  <th className="py-2 pr-4 font-medium">Used by</th>
                  <th className="py-2 font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {technologies.map((tech) => (
                  <tr key={tech.id} className="border-b border-rule">
                    <td className="py-3 pr-4 text-ink">{tech.name}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-muted">
                      {tech.category}
                    </td>
                    <td className="py-3 pr-4 text-muted">
                      {tech._count.projects} project
                      {tech._count.projects === 1 ? "" : "s"}
                    </td>
                    <td className="py-3">
                      <Link
                        href={`/admin/technologies/${tech.id}`}
                        className="font-medium text-deep-sea hover:text-deep-sea-dark"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <h2 className="annotation uppercase">Add technology</h2>
          <div className="mt-3">
            <TechnologyForm action={createTechnology} />
          </div>
        </div>
      </div>
    </div>
  );
}
