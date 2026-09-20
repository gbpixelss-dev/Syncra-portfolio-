/**
 * SYNCra Digital Agency — database seed script.
 *
 * Run via `npm run db:seed` (wraps `prisma db seed`, configured in
 * package.json). This is NOT run automatically by migrations.
 *
 * Seeds ONLY:
 *  1. The six already-approved public services (idempotent upsert by
 *     slug — safe to run repeatedly, never duplicates or overwrites
 *     unrelated fields).
 *  2. Optionally, a single Super Admin — ONLY if both
 *     ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD are set in
 *     the environment. If either is missing, admin bootstrap is
 *     skipped entirely and logged as skipped. There is no default,
 *     fallback, or hardcoded admin account.
 *
 * Never seeds: projects, testimonials, technologies, inquiries, or
 * site settings — none of that content has been approved/supplied.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Mirrors the exact locked names/slugs/descriptions from
// src/content/services.ts — the same content already approved and
// live on the public site, not new/invented copy.
const APPROVED_SERVICES = [
  {
    name: "Web & Software Development",
    slug: "web-software-development",
    shortDescription:
      "Building websites and web applications, front-end through full-stack.",
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    shortDescription: "Visual design for brands and print/digital materials.",
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    shortDescription: "Designing how digital products look and function.",
  },
  {
    name: "Video Production & Editing",
    slug: "video-production-editing",
    shortDescription: "Editing and producing video content.",
  },
  {
    name: "AI & Automation",
    slug: "ai-automation",
    shortDescription:
      "Applying AI tools and workflow automation to how a business operates.",
  },
  {
    name: "Social Media Management",
    slug: "social-media-management",
    shortDescription:
      "Ongoing management and content support for a client's social presence.",
  },
] as const;

async function seedServices() {
  for (const [index, service] of APPROVED_SERVICES.entries()) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        shortDescription: service.shortDescription,
      },
      create: {
        name: service.name,
        slug: service.slug,
        shortDescription: service.shortDescription,
        description: service.shortDescription,
        order: index,
        published: true,
      },
    });
  }
  console.log(`Seeded ${APPROVED_SERVICES.length} services (idempotent).`);
}

async function bootstrapAdmin() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!email || !password) {
    console.log(
      "Admin bootstrap skipped — ADMIN_BOOTSTRAP_EMAIL and/or " +
        "ADMIN_BOOTSTRAP_PASSWORD not set. No default admin was created."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, role: "SUPER_ADMIN" },
  });

  console.log(`Super Admin bootstrapped for ${email}.`);
}

async function main() {
  await seedServices();
  await bootstrapAdmin();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
