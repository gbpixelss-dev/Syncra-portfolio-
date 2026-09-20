"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SOCIAL_PLATFORMS } from "@/lib/validation/site-settings";
import type { ActionResult } from "@/lib/admin-action-result";

type SettingsFormValues = {
  contactEmail: string;
  whatsapp: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  socialLinks: Record<string, string>;
};

export function SiteSettingsForm({
  action,
  initialValues,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  initialValues: SettingsFormValues;
}) {
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {
    success: false,
  });

  return (
    <form action={formAction} className="max-w-xl space-y-8">
      {state.success && (
        <p className="rounded border border-rule bg-steam p-3 text-sm text-deep-sea-dark">
          Settings saved.
        </p>
      )}
      {state.error && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <fieldset className="space-y-4">
        <legend className="annotation uppercase">Contact</legend>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-ink">
            Contact email
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            defaultValue={initialValues.contactEmail}
            className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
          />
          {state.fieldErrors?.contactEmail && (
            <p className="mt-1 text-sm text-red-700">
              {state.fieldErrors.contactEmail[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-ink">
            WhatsApp number
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            defaultValue={initialValues.whatsapp}
            className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="annotation uppercase">Social links (optional)</legend>
        <p className="text-sm text-muted">
          Leave blank to keep a platform hidden from the public site.
        </p>
        {SOCIAL_PLATFORMS.map((platform) => (
          <div key={platform}>
            <label
              htmlFor={`social.${platform}`}
              className="block text-sm font-medium text-ink"
            >
              {platform}
            </label>
            <input
              id={`social.${platform}`}
              name={`social.${platform}`}
              defaultValue={initialValues.socialLinks[platform] ?? ""}
              placeholder="https://…"
              className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
            />
          </div>
        ))}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="annotation uppercase">SEO defaults</legend>
        <div>
          <label
            htmlFor="defaultSeoTitle"
            className="block text-sm font-medium text-ink"
          >
            Default SEO title
          </label>
          <input
            id="defaultSeoTitle"
            name="defaultSeoTitle"
            defaultValue={initialValues.defaultSeoTitle}
            className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
          />
          {state.fieldErrors?.defaultSeoTitle && (
            <p className="mt-1 text-sm text-red-700">
              {state.fieldErrors.defaultSeoTitle[0]}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="defaultSeoDescription"
            className="block text-sm font-medium text-ink"
          >
            Default SEO description
          </label>
          <textarea
            id="defaultSeoDescription"
            name="defaultSeoDescription"
            defaultValue={initialValues.defaultSeoDescription}
            rows={3}
            className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
          />
          {state.fieldErrors?.defaultSeoDescription && (
            <p className="mt-1 text-sm text-red-700">
              {state.fieldErrors.defaultSeoDescription[0]}
            </p>
          )}
        </div>
      </fieldset>

      <SubmitButton>Save settings</SubmitButton>
    </form>
  );
}
