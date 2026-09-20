import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PublishBadge } from "@/components/admin/PublishBadge";
import { TestimonialForm } from "@/components/admin/testimonials/TestimonialForm";
import { createTestimonial } from "./actions";

export const metadata: Metadata = {
  title: "Testimonials",
  robots: { index: false, follow: false },
};

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Testimonials</h1>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {testimonials.length === 0 ? (
            <p className="text-muted">No testimonials yet.</p>
          ) : (
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rule text-muted">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Company</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b border-rule">
                    <td className="py-3 pr-4 text-ink">{testimonial.name}</td>
                    <td className="py-3 pr-4 text-muted">
                      {testimonial.company ?? "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <PublishBadge published={testimonial.published} />
                    </td>
                    <td className="py-3">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}`}
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
          <h2 className="annotation uppercase">Add testimonial</h2>
          <div className="mt-3">
            <TestimonialForm action={createTestimonial} />
          </div>
        </div>
      </div>
    </div>
  );
}
