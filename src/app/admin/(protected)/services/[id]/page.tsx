import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ServiceForm } from "@/components/admin/services/ServiceForm";
import { updateService } from "../actions";

export const metadata: Metadata = {
  title: "Edit service",
  robots: { index: false, follow: false },
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    notFound();
  }

  const boundAction = updateService.bind(null, service.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Edit service</h1>
      <div className="mt-6">
        <ServiceForm
          action={boundAction}
          slugLocked={service.published}
          initialValues={{
            name: service.name,
            slug: service.slug,
            shortDescription: service.shortDescription,
            description: service.description,
            published: service.published,
          }}
        />
      </div>
    </div>
  );
}
