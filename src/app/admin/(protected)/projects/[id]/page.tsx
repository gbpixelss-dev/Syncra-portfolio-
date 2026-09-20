import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectForm } from "@/components/admin/projects/ProjectForm";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { updateProject, deleteProject } from "../actions";

export const metadata: Metadata = {
  title: "Edit project",
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, services, technologies] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        services: true,
        technologies: true,
        media: { orderBy: { order: "asc" } },
      },
    }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!project) {
    notFound();
  }

  const boundUpdate = updateProject.bind(null, project.id);
  const boundDelete = deleteProject.bind(null, project.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Edit project</h1>
        <DeleteForm
          action={boundDelete}
          confirmMessage={`Delete "${project.title}"? This cannot be undone.`}
        />
      </div>
      <div className="mt-6">
        <ProjectForm
          action={boundUpdate}
          allServices={services}
          allTechnologies={technologies}
          slugLocked={project.published}
          initialValues={{
            title: project.title,
            slug: project.slug,
            client: project.client ?? "",
            summary: project.summary,
            overview: project.overview ?? "",
            challenge: project.challenge ?? "",
            solution: project.solution ?? "",
            process: project.process ?? "",
            results: project.results ?? "",
            liveUrl: project.liveUrl ?? "",
            featured: project.featured,
            published: project.published,
            serviceIds: project.services.map((s) => s.serviceId),
            technologyIds: project.technologies.map((t) => t.technologyId),
            media: project.media.map((m) => ({
              type: m.type as "IMAGE" | "VIDEO" | "EMBED",
              url: m.url,
              thumbnailUrl: m.thumbnailUrl ?? "",
              alt: m.alt ?? "",
              caption: m.caption ?? "",
              isHero: m.isHero,
            })),
          }}
        />
      </div>
    </div>
  );
}
