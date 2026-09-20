"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { InquirySuccess } from "./InquirySuccess";
import { submitInquiry } from "@/app/start-a-project/actions";
import type { InquiryActionState } from "@/app/start-a-project/actions";
import type { SiteContact } from "@/lib/site-settings";

type ServiceOption = { id: string; name: string };

const PREFERRED_CONTACT_LABELS: Record<string, string> = {
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
  const [state, formAction] = useActionState<InquiryActionState, FormData>(
    submitInquiry,
    INITIAL_STATE
  );

  if (state.status === "success") {
    return <InquirySuccess contact={contact} />;
  }

  const values = state.values;

  return (
    <form action={formAction} className="max-w-2xl space-y-10">
      {state.error && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      {/* Honeypot — hidden from sighted and keyboard/screen-reader
          users; a filled value means a bot, not a person. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website_url">Leave this field empty</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset>
        <legend className="text-lg font-semibold text-ink">
          What do you need?
        </legend>
        <p className="mt-1 text-sm text-muted">Select one or more services.</p>
        {state.fieldErrors?.serviceIds && (
          <p className="mt-1 text-sm text-red-700">
            {state.fieldErrors.serviceIds[0]}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-4">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-2 text-sm text-ink"
            >
              <input
                type="checkbox"
                name="serviceIds"
                value={service.id}
                defaultChecked={values?.serviceIds.includes(service.id)}
              />
              {service.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink">
          Tell us about it
        </legend>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-ink">
            Project description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            defaultValue={values?.description}
            className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
          />
          {state.fieldErrors?.description && (
            <p className="mt-1 text-sm text-red-700">
              {state.fieldErrors.description[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Budget (optional)"
            name="budget"
            defaultValue={values?.budget}
          />
          <TextField
            label="Timeline (optional)"
            name="timeline"
            defaultValue={values?.timeline}
          />
        </div>

        <TextField
          label="Current website/platform (optional)"
          name="currentWebsite"
          defaultValue={values?.currentWebsite}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink">
          How do we reach you?
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Name"
            name="name"
            defaultValue={values?.name}
            required
            errors={state.fieldErrors?.name}
          />
          <TextField
            label="Company (optional)"
            name="company"
            defaultValue={values?.company}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Email"
            name="email"
            type="email"
            defaultValue={values?.email}
            required
            errors={state.fieldErrors?.email}
          />
          <TextField
            label="Phone"
            name="phone"
            defaultValue={values?.phone}
            required
            errors={state.fieldErrors?.phone}
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-ink">
            Preferred contact method
          </span>
          <div className="mt-2 flex flex-wrap gap-4">
            {Object.entries(PREFERRED_CONTACT_LABELS).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="radio"
                  name="preferredContact"
                  value={value}
                  required
                  defaultChecked={values?.preferredContact === value}
                />
                {label}
              </label>
            ))}
          </div>
          {state.fieldErrors?.preferredContact && (
            <p className="mt-1 text-sm text-red-700">
              {state.fieldErrors.preferredContact[0]}
            </p>
          )}
        </div>
      </fieldset>

      <SubmitButton pendingLabel="Sending…">Send inquiry</SubmitButton>
    </form>
  );
}

function TextField({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
      />
      {errors && <p className="mt-1 text-sm text-red-700">{errors[0]}</p>}
    </div>
  );
}
