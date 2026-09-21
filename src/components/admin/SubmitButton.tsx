"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingLabel = "Sending...",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition duration-200 hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <svg
            className="mr-2 animate-spin"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.25"
            />
            <path
              d="M21 12a9 9 0 0 1-9 9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
