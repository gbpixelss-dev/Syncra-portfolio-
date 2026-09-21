"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { InquirySuccess } from "./InquirySuccess";
import { submitInquiry } from "@/app/start-a-project/actions";
import type { InquiryActionState } from "@/app/start-a-project/actions";
import type { SiteContact } from "@/lib/site-settings";

type ServiceOption = { id: string; name: string };

const INITIAL_STATE: InquiryActionState = { status: "idle" };

const budgetOptions = [
  "Under ₦50k",
  "₦50k–₦150k",
  "₦150k–₦500k",
  "₦500k+",
];

export function StartProjectForm({
  services,
  contact,
}: {
  services: ServiceOption[];
  contact: SiteContact;
}) {
  const [state, formAction] = useActionState(
    submitInquiry,
    INITIAL_STATE
  );

  if (state.status === "success") {
    return <InquirySuccess contact={contact} />;
  }

  const values = state.values;

  return (
    <form action={formAction} className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-rule bg-surface p-6 shadow-sm sm:p-8">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-ink">
            Start Your Project
          </h2>
          <p className="mt-2 text-muted">
            Tell us what you need and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {state.error && (
          <p className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {state.error}
          </p>
        )}

        <div className="space-y-6">

          <Field
            label="Full Name"
            name="name"
            defaultValue={values?.name}
            required
          />

          <div className="grid gap-5 sm:grid-cols-2">

            <Field
              label="Email"
              name="email"
              type="email"
              defaultValue={values?.email}
              required
            />

            <Field
              label="WhatsApp Number"
              name="phone"
              defaultValue={values?.phone}
              required
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-ink">
              Service
            </label>

            <select
              name="serviceIds"
              required
              defaultValue={values?.serviceIds?.[0] ?? ""}
              className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink"
            >
              <option value="">Select a service</option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>

          </div>

          <div>

            <label className="mb-3 block text-sm font-semibold text-ink">
              Estimated Budget
            </label>

            <div className="flex flex-wrap gap-3">

              {budgetOptions.map((budget) => (
                <label key={budget}>
                  <input
                    type="radio"
                    name="budget"
                    value={budget}
                    className="peer sr-only"
                    defaultChecked={values?.budget === budget}
                  />

                  <span className="inline-flex cursor-pointer rounded-full border border-rule px-4 py-2 text-sm transition peer-checked:border-deep-sea peer-checked:bg-deep-sea peer-checked:text-white">
                    {budget}
                  </span>

                </label>
              ))}

            </div>

          </div>

          <Field
            label="Timeline (Optional)"
            name="timeline"
            defaultValue={values?.timeline}
          />

          <div>

            <label className="mb-2 block text-sm font-semibold text-ink">
              Project Notes (Optional)
            </label>

            <textarea
              name="description"
              rows={5}
              defaultValue={values?.description}
              className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink"
              placeholder="Briefly describe your project..."
            />

          </div>

          <div className="pt-2">

            <SubmitButton pendingLabel="Sending...">
              Submit Inquiry
            </SubmitButton>

          </div>

        </div>

      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>

      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink"
      />

    </div>
  );
}
