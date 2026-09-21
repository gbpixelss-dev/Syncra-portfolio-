"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { InquirySuccess } from "./InquirySuccess";
import { submitInquiry } from "@/app/start-a-project/actions";
import type { InquiryActionState } from "@/app/start-a-project/actions";
import type { SiteContact } from "@/lib/site-settings";

type ServiceOption = { id: string; name: string };

const INITIAL_STATE: InquiryActionState = { status: "idle" };

const CONTACT_OPTIONS = [
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Phone" },
] as const;

const BUDGET_OPTIONS = [
  "Under ₦50k",
  "₦50k – ₦150k",
  "₦150k – ₦500k",
  "₦500k+",
];

export function StartProjectForm({
  services,
  contact,
}: {
  services: ServiceOption[];
  contact: SiteContact;
}) {
  const [state, formAction] = useActionState<InquiryActionState, FormData>(
    submitInquiry,
    INITIAL_STATE
  );

  if (state.status === "success") {
    return <InquirySuccess contact={contact} />;
  }

  const values = state.values;

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <input name="website_url" type="text" autoComplete="off" tabIndex={-1} />
      </div>

      {/* Name + Company */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            required
            defaultValue={values?.name}
            className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink outline-none transition focus:border-deep-sea focus:ring-2 focus:ring-deep-sea/20"
            placeholder="John Doe"
          />
        </Field>

        <Field label="Company (Optional)" htmlFor="company">
          <input
            id="company"
            name="company"
            defaultValue={values?.company}
            className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink outline-none transition focus:border-deep-sea focus:ring-2 focus:ring-deep-sea/20"
            placeholder="SYNCra Ltd."
          />
        </Field>
      </div>

      {/* Email + Phone */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={values?.email}
            className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink outline-none transition focus:border-deep-sea focus:ring-2 focus:ring-deep-sea/20"
            placeholder="you@example.com"
          />
        </Field>

        <Field label="WhatsApp Number" htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            required
            defaultValue={values?.phone}
            className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink outline-none transition focus:border-deep-sea focus:ring-2 focus:ring-deep-sea/20"
            placeholder="+234..."
          />
        </Field>
      </div>

      {/* Service Dropdown */}
      <Field label="Choose a Service" htmlFor="serviceIds" required>
        <select
          id="serviceIds"
          name="serviceIds"
          required
          defaultValue={values?.serviceIds[0] ?? ""}
          className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink outline-none transition focus:border-deep-sea focus:ring-2 focus:ring-deep-sea/20"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </Field>

      {/* Budget Chips */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">
          Estimated Budget
        </legend>

        <div className="flex flex-wrap gap-3">
          {BUDGET_OPTIONS.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={option}
                defaultChecked={values?.budget === option}
                className="peer hidden"
              />
              <span className="inline-flex rounded-full border border-rule px-4 py-2 text-sm text-ink transition peer-checked:border-deep-sea peer-checked:bg-deep-sea peer-checked:text-white hover:border-deep-sea">
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Timeline */}
      <Field label="Timeline (Optional)" htmlFor="timeline">
        <input
          id="timeline"
          name="timeline"
          defaultValue={values?.timeline}
          className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink outline-none transition focus:border-deep-sea focus:ring-2 focus:ring-deep-sea/20"
          placeholder="2 weeks, 1 month..."
        />
      </Field>

      {/* Preferred Contact */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">
          Preferred Contact Method
        </legend>

        <div className="flex flex-wrap gap-3">
          {CONTACT_OPTIONS.map((item) => (
            <label key={item.value} className="cursor-pointer">
              <input
                type="radio"
                name="preferredContact"
                value={item.value}
                defaultChecked={values?.preferredContact === item.value}
                className="peer hidden"
                required
              />
              <span className="inline-flex rounded-full border border-rule px-4 py-2 text-sm text-ink transition peer-checked:border-deep-sea peer-checked:bg-deep-sea peer-checked:text-white hover:border-deep-sea">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Project Description */}
      <Field label="Project Details" htmlFor="description" required>
        <textarea
          id="description"
          name="description"
          rows={6}
          required
          defaultValue={values?.description}
          className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink outline-none transition focus:border-deep-sea focus:ring-2 focus:ring-deep-sea/20"
          placeholder="Tell us about your project, goals and anything important."
        />
      </Field>

      {/* Current Website */}
      <Field label="Current Website (Optional)" htmlFor="currentWebsite">
        <input
          id="currentWebsite"
          name="currentWebsite"
          defaultValue={values?.currentWebsite}
          className="w-full rounded-xl border border-rule bg-surface px-4 py-3 text-ink outline-none transition focus:border-deep-sea focus:ring-2 focus:ring-deep-sea/20"
          placeholder="https://..."
        />
      </Field>

      <div className="pt-2">
        <SubmitButton pendingLabel="Sending...">
          Submit Inquiry
        </SubmitButton>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}
