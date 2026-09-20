import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TechnologyForm } from "@/components/admin/technologies/TechnologyForm";
import { TechnologyDeleteButton } from "@/components/admin/TechnologyDeleteButton";
import { updateTechnology, deleteTechnology } from "../actions";

export const metadata: Metadata = {
  title: "Edit technology",
  robots: { index: false, follow: false },
};

export default async function EditTechnologyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const technology = await prisma.technology.findUnique({ where: { id } });

  if (!technology) {
    notFound();
  }

  const boundUpdate = updateTechnology.bind(null, technology.id);
  const boundDelete = deleteTechnology.bind(null, technology.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Edit technology</h1>
        <TechnologyDeleteButton
          action={boundDelete}
          confirmMessage={`Delete "${technology.name}"? This cannot be undone.`}
        />
      </div>
      <div className="mt-6">
        <TechnologyForm
          action={boundUpdate}
          initialValues={{
            name: technology.name,
            slug: technology.slug,
            category: technology.category,
          }}
        />
      </div>
    </div>
  );
}
