import type { ReactNode } from "react";
import { AdminNav } from "./AdminNav";
import { SignOutButton } from "./SignOutButton";

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface lg:flex">
      <aside className="border-b border-rule bg-steam p-4 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-6">
        <p className="annotation">SYNCra Admin</p>
        <div className="mt-4">
          <AdminNav />
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
          <span className="truncate text-sm text-muted">{email}</span>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}
