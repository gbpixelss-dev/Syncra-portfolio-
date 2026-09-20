import "server-only";

/**
 * Lightweight in-memory sliding-window rate limiter for the public
 * inquiry endpoint.
 *
 * IMPORTANT LIMITATION — read before relying on this elsewhere: this
 * state lives in the memory of a single serverless function
 * instance. On Vercel, concurrent/cold-started instances do NOT share
 * this Map, so the effective limit across the whole deployment is
 * "roughly N per window per warm instance", not a hard global cap.
 * This is a real, intentional trade-off for Phase 9 — it stops naive
 * scripted spam without adding an infrastructure dependency, but it
 * is NOT a substitute for a distributed limiter (e.g. Upstash Redis)
 * if inquiry abuse ever becomes a genuine problem. The function
 * signature below (`checkRateLimit(key)`) is isolated in this one
 * module specifically so swapping the implementation later doesn't
 * touch the calling code in the inquiry Server Action.
 */

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

const attemptsByKey = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const existing = (attemptsByKey.get(key) ?? []).filter(
    (timestamp) => timestamp > windowStart
  );

  if (existing.length >= MAX_REQUESTS_PER_WINDOW) {
    attemptsByKey.set(key, existing);
    return { allowed: false };
  }

  existing.push(now);
  attemptsByKey.set(key, existing);
  return { allowed: true };
}
