import type { NextConfig } from "next";

/**
 * SYNCra Digital Agency — Next.js configuration.
 *
 * Kept intentionally minimal for Phase 1 (project foundation).
 * Image remote patterns for object storage (R2/S3) will be added
 * in the media-upload phase once a storage domain is provisioned —
 * not guessed at here.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Prisma's generated client and bcryptjs are CJS-heavy/native-ish
  // packages that should run as real Node modules rather than being
  // bundled by webpack for server components — this is the current
  // (non-experimental, as of Next 15) config key for that.
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  images: {
    // Local/public brand + placeholder assets only for now.
    // Remote patterns for the object-storage domain are added when
    // that integration is implemented (Phase 8), not before.
    remotePatterns: [],
  },
};

export default nextConfig;
