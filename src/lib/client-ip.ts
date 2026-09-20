import "server-only";
import { headers } from "next/headers";

/**
 * Best-effort client IP for rate-limiting purposes only — not used
 * for any security/authorization decision. Vercel sets
 * x-forwarded-for; falls back to a constant bucket if absent (e.g.
 * local dev), which just means local requests share one rate-limit
 * bucket rather than being unlimited.
 */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0];
    return firstIp ? firstIp.trim() : "unknown";
  }
  return "unknown";
}
