import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { InquiryStatusForm } from "@/components/admin/inquiries/InquiryStatusForm";
import { updateInquiryStatus } from "../actions";

export const metadata: Metadata = {
  title: "Inquiry detail",
  robots: { index: false, follow: false },
};

export default async function AdminInquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { services: { include: { service: true } } },
  });

  if (!inquiry) {
    notFound();
  }

  const boundUpdate = updateInquiryStatus.bind(null, inquiry.id);

  return (
    <div>
      <Link
        href="/admin/inquiries"
        className="text-sm font-medium text-deep-sea hover:text-deep-sea-dark"
      >
        ← All inquiries
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-ink">{inquiry.name}</h1>

      <div className="mt-6">
        <InquiryStatusForm action={boundUpdate} currentStatus={inquiry.status} />
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Company" value={inquiry.company} />
        <Field label="Email" value={inquiry.email} />
        <Field label="Phone" value={inquiry.phone} />
        <Field label="Preferred contact" value={inquiry.preferredContact} />
        <Field
          label="Services"
          value={inquiry.services.map((s) => s.service.name).join(", ") || null}
        />
        <Field label="Budget" value={inquiry.budget} />
        <Field label="Timeline" value={inquiry.timeline} />
        <Field label="Current website/platform" value={inquiry.currentWebsite} />
        <Field label="Received" value={inquiry.createdAt.toLocaleString()} />
        <Field label="Last updated" value={inquiry.updatedAt.toLocaleString()} />
      </dl>

      <div className="mt-8">
        <h2 className="annotation uppercase">Project description</h2>
        <p className="mt-2 max-w-2xl whitespace-pre-wrap text-ink">
          {inquiry.description}
        </p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="annotation uppercase">{label}</dt>
      <dd className="mt-1 text-ink">{value ?? <span className="text-muted">—</span>}</dd>
    </div>
  );
}
