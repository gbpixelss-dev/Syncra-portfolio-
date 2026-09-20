import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ProjectForm } from "@/components/admin/projects/ProjectForm";
import { createProject } from "../actions";

export const metadata: Metadata = {
  title: "New project",
  robots: { index: false, follow: false },
};

export default async function NewProjectPage() {
  const [services, technologies] = await Promise.all([
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">New project</h1>
      <div className="mt-6">
        <ProjectForm
          action={createProject}
          allServices={services}
          allTechnologies={technologies}
        />
      </div>
    </div>
  );
}
