import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedServices() {
  const services = [
    {
      name: "Web Development",
      slug: "web-development",
      shortDescription: "Business websites, landing pages and web apps.",
      order: 1,
    },
    {
      name: "Graphic Design",
      slug: "graphic-design",
      shortDescription: "Flyers, branding and social media designs.",
      order: 2,
    },
    {
      name: "Brand Identity",
      slug: "brand-identity",
      shortDescription: "Logos, colors and complete brand systems.",
      order: 3,
    },
    {
      name: "Video Editing",
      slug: "video-editing",
      shortDescription: "Short-form videos and professional edits.",
      order: 4,
    },
    {
      name: "Content Creation",
      slug: "content-creation",
      shortDescription: "Content strategy and creative assets.",
      order: 5,
    },
    {
      name: "Automation",
      slug: "automation",
      shortDescription: "Workflow and business process automation.",
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        shortDescription: service.shortDescription,
        order: service.order,
      },
      create: {
        name: service.name,
        slug: service.slug,
        shortDescription: service.shortDescription,
        order: service.order,
        published: true,
      },
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
