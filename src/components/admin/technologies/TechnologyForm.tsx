"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TECHNOLOGY_CATEGORIES } from "@/lib/validation/technology";
import type { ActionResult } from "@/lib/admin-action-result";

type TechnologyFormValues = { name: string; slug: string; category: string };
const EMPTY: TechnologyFormValues = { name: "", slug: "", category: "DEVELOPMENT" };

export function TechnologyForm({
  action,
  initialValues = EMPTY,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  initialValues?: TechnologyFormValues;
}) {
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {
    success: false,
  });

  return (
    <form action={formAction} className="max-w-md space-y-4">
      {state.error && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Name
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

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-ink">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={initialValues.slug}
          required
          className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
        />
        {state.fieldErrors?.slug && (
          <p className="mt-1 text-sm text-red-700">{state.fieldErrors.slug[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-ink">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={initialValues.category}
          className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
        >
          {TECHNOLOGY_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <SubmitButton>Save technology</SubmitButton>
    </form>
  );
}
