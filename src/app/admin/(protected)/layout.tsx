import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

/**
 * Defense-in-depth: middleware.ts already blocks unauthenticated
 * requests to everything under /admin except /admin/login, but this
 * layout re-checks server-side anyway — both because relying on a
 * single enforcement point is fragile, and because it needs the
 * session's email to render the admin shell regardless.
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  return <AdminShell email={session.user.email}>{children}</AdminShell>;
}
