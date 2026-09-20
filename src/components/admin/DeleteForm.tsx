"use client";

/**
 * Wraps a server-action-bound delete form with a native confirm()
 * dialog — a real, accessible confirmation step rather than an
 * accidental one-click delete. `action` is the bound server action
 * (e.g. deleteProject.bind(null, id)).
 */
export function DeleteForm({
  action,
  confirmMessage,
  label = "Delete",
}: {
  action: () => Promise<void>;
  confirmMessage: string;
  label?: string;
}) {
  return (
    <form
      action={action}
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
        {label}
      </button>
    </form>
  );
}
