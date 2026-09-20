import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { INQUIRY_STATUSES } from "@/lib/validation/inquiry";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

type SearchParams = { status?: string };

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { status } = await searchParams;
  const validStatus = INQUIRY_STATUSES.includes(
    status as (typeof INQUIRY_STATUSES)[number]
  )
    ? status
    : undefined;

  const inquiries = await prisma.inquiry.findMany({
    where: validStatus ? { status: validStatus as never } : undefined,
    orderBy: { createdAt: "desc" },
    include: { services: { include: { service: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Inquiries</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/admin/inquiries"
          className={`rounded border px-3 py-1 text-sm ${
            !validStatus
              ? "border-deep-sea bg-deep-sea text-steam"
              : "border-rule text-ink hover:border-deep-sea"
          }`}
        >
          All
        </Link>
        {INQUIRY_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/inquiries?status=${s}`}
            className={`rounded border px-3 py-1 text-sm ${
              validStatus === s
                ? "border-deep-sea bg-deep-sea text-steam"
                : "border-rule text-ink hover:border-deep-sea"
            }`}
          >
            {s.replace("_", " ")}
          </Link>
        ))}
      </div>

      {inquiries.length === 0 ? (
        <p className="mt-6 text-muted">No inquiries yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-rule text-muted">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Company</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Services</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium">Received</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-rule">
                  <td className="py-3 pr-4 text-ink">
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="font-medium text-deep-sea hover:text-deep-sea-dark"
                    >
                      {inquiry.name}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    {inquiry.company ?? "—"}
                  </td>
                  <td className="py-3 pr-4 text-muted">{inquiry.email}</td>
                  <td className="py-3 pr-4 text-muted">
                    {inquiry.services.map((s) => s.service.name).join(", ")}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="annotation">{inquiry.status}</span>
                  </td>
                  <td className="py-3 text-muted">
                    {inquiry.createdAt.toLocaleDateString()}
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
