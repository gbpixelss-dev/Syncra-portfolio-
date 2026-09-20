"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingLabel = "Saving…",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-deep-sea px-4 py-2 font-medium text-steam transition-colors hover:bg-deep-sea-dark disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
