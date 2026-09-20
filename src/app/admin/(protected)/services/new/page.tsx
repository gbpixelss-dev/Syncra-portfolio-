import type { Metadata } from "next";
import { ServiceForm } from "@/components/admin/services/ServiceForm";
import { createService } from "../actions";

export const metadata: Metadata = {
  title: "New service",
  robots: { index: false, follow: false },
};

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">New service</h1>
      <div className="mt-6">
        <ServiceForm action={createService} />
      </div>
    </div>
  );
}
