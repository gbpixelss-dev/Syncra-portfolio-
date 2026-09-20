"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionResult } from "@/lib/admin-action-result";

type ServiceFormValues = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  published: boolean;
};

const EMPTY: ServiceFormValues = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  published: false,
};

export function ServiceForm({
  action,
  initialValues = EMPTY,
  slugLocked = false,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  initialValues?: ServiceFormValues;
  slugLocked?: boolean;
}) {
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {
    success: false,
  });

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {state.error && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <Field label="Name" name="name" defaultValue={initialValues.name} errors={state.fieldErrors?.name} required />

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-ink">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={initialValues.slug}
          disabled={slugLocked}
          required
          className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink disabled:bg-steam disabled:text-muted focus-visible:border-deep-sea"
        />
        {slugLocked && (
          <p className="mt-1 text-sm text-muted">
            The slug can&apos;t be changed once a service is published —
            that would break its public URL. Unpublish first if you need to
            change it.
          </p>
        )}
        {state.fieldErrors?.slug && (
          <p className="mt-1 text-sm text-red-700">{state.fieldErrors.slug[0]}</p>
        )}
      </div>

      <Field
        label="Short description"
        name="shortDescription"
        defaultValue={initialValues.shortDescription}
        errors={state.fieldErrors?.shortDescription}
        required
        helpText="Shown on the homepage and services list — keep it to one sentence."
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-ink">
          Full description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={initialValues.description}
          required
          rows={5}
          className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
        />
        {state.fieldErrors?.description && (
          <p className="mt-1 text-sm text-red-700">
            {state.fieldErrors.description[0]}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={initialValues.published}
          className="h-4 w-4"
        />
        <label htmlFor="published" className="text-sm text-ink">
          Published (visible on the public site)
        </label>
      </div>

      <SubmitButton>Save service</SubmitButton>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  errors,
  required,
  helpText,
}: {
  label: string;
  name: string;
  defaultValue: string;
  errors?: string[];
  required?: boolean;
  helpText?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
      />
      {helpText && <p className="mt-1 text-sm text-muted">{helpText}</p>}
      {errors && <p className="mt-1 text-sm text-red-700">{errors[0]}</p>}
    </div>
  );
}
