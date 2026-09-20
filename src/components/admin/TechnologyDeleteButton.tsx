"use client";

import { useActionState } from "react";

export function TechnologyDeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<{ error?: string }>;
  confirmMessage: string;
}) {
  const [state, formAction] = useActionState<{ error?: string }, FormData>(
    async () => action(),
    {}
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm font-medium text-red-700 hover:text-red-900"
      >
        Delete
      </button>
      {state.error && (
        <p role="alert" className="mt-1 text-xs text-red-700">
          {state.error}
        </p>
      )}
    </form>
  );
}
