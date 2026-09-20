import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

/**
 * Every Server Action that mutates data calls this FIRST. Never trust
 * a client-submitted flag claiming the user is an admin — the only
 * source of truth is the server-verified session.
 */
export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new UnauthorizedError();
  }

  return session;
}
