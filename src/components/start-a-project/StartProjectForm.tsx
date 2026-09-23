"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { InquirySuccess } from "./InquirySuccess";
import { submitInquiry } from "@/app/start-a-project/actions";
import type { InquiryActionState } from "@/app/start-a-project/actions";
import type { SiteContact } from "@/lib/site-settings";

type ServiceOption = { id: string; name: string };

const PREFERRED_CONTACT_LABELS = {
  EMAIL: "Email",
  PHONE: "Phone",
  WHATSAPP: "WhatsApp",
};

const INITIAL_STATE: InquiryActionState = { status: "idle" };

export function StartProjectForm({
  services,
  contact,
}: {
  services: ServiceOption[];
  contact: SiteContact;
}) {
  const [state, formAction] = useActionState(submitInquiry, INITIAL_STATE);

  if (state.status === "success") {
    return <InquirySuccess contact={contact} />;
  }

  const values = state.values;

  return (
    <form
      id="project-form"
      action={formAction}
      className="glass-card fade-up mx-auto max-w-3xl space-y-8 p-8 sm:p-10"
    >
      {state.error && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <div aria-hidden="true" className="hidden">
        <input
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="glass-card fade-up p-6">
        <legend className="text-xl font-semibold text-white">
          What do you need?
        </legend>

        <div className="mt-4 flex flex-wrap gap-3">
          {services.map((service) => (
            <label
              key={service.id}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              <input
                type="checkbox"
                name="serviceIds"
                value={service.id}
                defaultChecked={values?.serviceIds?.includes(service.id)}
                className="mr-2"
              />
              {service.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="glass-card fade-up fade-delay-1 p-6">
        <legend className="text-xl font-semibold text-white">
          Tell us about it
        </legend>

        <div className="mt-5 space-y-5">
          <Field
            label="Project description"
            name="description"
            textarea
            required
            defaultValue={values?.description}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Budget"
              name="budget"
              defaultValue={values?.budget}
            />
            <Field
              label="Timeline"
              name="timeline"
              defaultValue={values?.timeline}
            />
          </div>

          <Field
            label="Current website/platform"
            name="currentWebsite"
            defaultValue={values?.currentWebsite}
          />
        </div>
      </fieldset>

      <fieldset className="glass-card fade-up fade-delay-2 p-6">
        <legend className="text-xl font-semibold text-white">
          Your details
        </legend>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label="Full Name"
            name="name"
            required
            defaultValue={values?.name}
          />
          <Field
            label="Company"
            name="company"
            defaultValue={values?.company}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            defaultValue={values?.email}
          />
          <Field
            label="WhatsApp Number"
            name="phone"
            required
            defaultValue={values?.phone}
          />
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm text-slate-300">
            Preferred contact
          </p>

          <div className="flex flex-wrap gap-3">
            {Object.entries(PREFERRED_CONTACT_LABELS).map(([value, label]) => (
              <label
                key={value}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-cyan-400/50 hover:bg-white/10"
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={value}
                  defaultChecked={values?.preferredContact === value}
                  className="mr-2"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <div className="fade-up fade-delay-3">
        <SubmitButton pendingLabel="Sending...">
          Send Inquiry
        </SubmitButton>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">
        {label}
      </label>

      {textarea ? (
        <textarea
          name={name}
          rows={5}
          required={required}
          defaultValue={defaultValue}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 backdrop-blur-md transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 backdrop-blur-md transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
        />
      )}
    </div>
  );
}
