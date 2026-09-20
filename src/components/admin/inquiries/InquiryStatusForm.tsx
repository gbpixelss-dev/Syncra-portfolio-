"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { INQUIRY_STATUSES } from "@/lib/validation/inquiry";
import type { ActionResult } from "@/lib/admin-action-result";

export function InquiryStatusForm({
  action,
  currentStatus,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  currentStatus: string;
}) {
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {
    success: false,
  });

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-ink">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={currentStatus}
          className="mt-1 rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
        >
          {INQUIRY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <SubmitButton pendingLabel="Updating…">Update status</SubmitButton>
      {state.success && (
        <span className="text-sm text-deep-sea">Saved.</span>
      )}
      {state.error && (
        <span className="text-sm text-red-700">{state.error}</span>
      )}
    </form>
  );
}
