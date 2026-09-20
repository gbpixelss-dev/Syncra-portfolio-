import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

/**
 * Deliberately outside the (protected) route group/layout — this
 * page must never require a session to render, or signing in would
 * be impossible. Middleware explicitly allows this path through.
 */
export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-steam px-4">
      <div className="w-full max-w-sm">
        <p className="annotation text-center">SYNCra Admin</p>
        <h1 className="mt-2 text-center text-2xl font-semibold text-ink">
          Sign in
        </h1>
        <div className="mt-8 flex justify-center">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
