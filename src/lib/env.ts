import "server-only";

/**
 * SYNCra Digital Agency — environment variable reference.
 *
 * SERVER-ONLY. Nothing in this file should ever be imported from a
 * Client Component — only from server components, route handlers, or
 * server actions. Keeping this centralized means later phases (Prisma,
 * Auth.js, object storage, Resend) read variables from one place
 * instead of scattering `process.env.X` across the codebase.
 *
 * No secrets live in this file or anywhere in the repository — see
 * .env.example for the expected variable names. Values are supplied
 * via the deployment environment (Vercel project settings) or a local
 * untracked .env.local file.
 *
 * Variables below are declared but intentionally UNUSED until the
 * phase that needs them (database/auth in Phase 7, storage in
 * Phase 8) — declaring them now just documents the expected shape so
 * those phases don't have to restructure this module. Resend
 * (Phase 9) variables ARE in active use — see src/lib/email.ts,
 * which reads them directly via process.env rather than through this
 * module (a standalone script/module boundary choice, not an
 * inconsistency).
 */

function optionalEnv(key: string): string | undefined {
  return process.env[key];
}

export const env = {
  // Application
  appUrl: optionalEnv("NEXT_PUBLIC_APP_URL"),

  // Database (Phase 7)
  databaseUrl: optionalEnv("DATABASE_URL"),
  directUrl: optionalEnv("DIRECT_URL"),

  // Auth.js (Phase 7)
  authSecret: optionalEnv("NEXTAUTH_SECRET"),
  authUrl: optionalEnv("NEXTAUTH_URL"),

  // Object storage — R2/S3 (Phase 8)
  storageAccountId: optionalEnv("STORAGE_ACCOUNT_ID"),
  storageAccessKeyId: optionalEnv("STORAGE_ACCESS_KEY_ID"),
  storageSecretAccessKey: optionalEnv("STORAGE_SECRET_ACCESS_KEY"),
  storageBucketName: optionalEnv("STORAGE_BUCKET_NAME"),
  storagePublicUrl: optionalEnv("STORAGE_PUBLIC_URL"),

  // Resend (Phase 9)
  resendApiKey: optionalEnv("RESEND_API_KEY"),
  resendFromAddress: optionalEnv("RESEND_FROM_ADDRESS"),
  inquiryNotificationAddress: optionalEnv("INQUIRY_NOTIFICATION_ADDRESS"),
} as const;
