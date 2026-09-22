import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedServices() {
  const services = [
    { name: "Web Development", slug: "web-development", order: 1 },
    { name: "Graphic Design", slug: "graphic-design", order: 2 },
    { name: "Brand Identity", slug: "brand-identity", order: 3 },
    { name: "Video Editing", slug: "video-editing", order: 4 },
    { name: "Content Creation", slug: "content-creation", order: 5 },
    { name: "Automation", slug: "automation", order: 6 },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: { ...service, published: true },
    });
  }

  console.log("Services seeded.");
}

async function bootstrapAdmin() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!email || !password) {
    console.log("Admin bootstrap skipped (missing env vars).");
    return;
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      password: hashed,
      role: UserRole.SUPER_ADMIN,
    },
    create: {
      email,
      password: hashed,
      role: UserRole.SUPER_ADMIN,
    },
  });

  console.log(`Super Admin bootstrapped for ${email}.`);
}

async function main() {
  await seedServices();
  await bootstrapAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
