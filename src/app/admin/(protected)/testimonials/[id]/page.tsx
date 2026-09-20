import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TestimonialForm } from "@/components/admin/testimonials/TestimonialForm";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { updateTestimonial, deleteTestimonial } from "../actions";

export const metadata: Metadata = {
  title: "Edit testimonial",
  robots: { index: false, follow: false },
};

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) {
    notFound();
  }

  const boundUpdate = updateTestimonial.bind(null, testimonial.id);
  const boundDelete = deleteTestimonial.bind(null, testimonial.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Edit testimonial</h1>
        <DeleteForm
          action={boundDelete}
          confirmMessage={`Delete the testimonial from "${testimonial.name}"? This cannot be undone.`}
        />
      </div>
      <div className="mt-6">
        <TestimonialForm
          action={boundUpdate}
          initialValues={{
            name: testimonial.name,
            role: testimonial.role ?? "",
            company: testimonial.company ?? "",
            quote: testimonial.quote,
            published: testimonial.published,
          }}
        />
      </div>
    </div>
  );
}
