import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

/**
 * Protects every /admin/* route except /admin/login itself.
 * Edge-compatible: getToken() from next-auth/jwt only decodes/verifies
 * the JWT (via `jose`), it does not touch Prisma/the database, so this
 * runs safely in the Edge middleware runtime.
 *
 * This is the primary enforcement point; the (protected) admin layout
 * also re-checks the session server-side as defense-in-depth (and
 * because it needs the session data to render the admin shell anyway).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
