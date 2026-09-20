"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionResult } from "@/lib/admin-action-result";

type TestimonialFormValues = {
  name: string;
  role: string;
  company: string;
  quote: string;
  published: boolean;
};

const EMPTY: TestimonialFormValues = {
  name: "",
  role: "",
  company: "",
  quote: "",
  published: false,
};

export function TestimonialForm({
  action,
  initialValues = EMPTY,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  initialValues?: TestimonialFormValues;
}) {
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {
    success: false,
  });

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      {state.error && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Client name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={initialValues.name}
          required
          className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-sm text-red-700">{state.fieldErrors.name[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-ink">
            Role (optional)
          </label>
          <input
            id="role"
            name="role"
            defaultValue={initialValues.role}
            className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-ink">
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            defaultValue={initialValues.company}
            className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote" className="block text-sm font-medium text-ink">
          Quote
        </label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={initialValues.quote}
          required
          rows={4}
          className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
        />
        {state.fieldErrors?.quote && (
          <p className="mt-1 text-sm text-red-700">{state.fieldErrors.quote[0]}</p>
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

      <SubmitButton>Save testimonial</SubmitButton>
    </form>
  );
}
