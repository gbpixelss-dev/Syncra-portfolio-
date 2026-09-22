import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedServices() {
  const services = [
    {
      name: "Web Development",
      slug: "web-development",
      shortDescription: "Business websites, landing pages and web apps.",
      description:
        "Professional business websites, landing pages, web applications and custom development tailored to your brand.",
      order: 1,
    },
    {
      name: "Graphic Design",
      slug: "graphic-design",
      shortDescription: "Flyers, branding and social media designs.",
      description:
        "High-quality flyers, posters, social media creatives, banners and marketing materials.",
      order: 2,
    },
    {
      name: "Brand Identity",
      slug: "brand-identity",
      shortDescription: "Logos, colors and complete brand systems.",
      description:
        "Complete brand identity including logo design, color systems, typography and brand guidelines.",
      order: 3,
    },
    {
      name: "Video Editing",
      slug: "video-editing",
      shortDescription: "Short-form videos and professional edits.",
      description:
        "Professional video editing for YouTube, Instagram, TikTok, commercials and promotional content.",
      order: 4,
    },
    {
      name: "Content Creation",
      slug: "content-creation",
      shortDescription: "Content strategy and creative assets.",
      description:
        "Content planning, creative direction and assets for personal brands and businesses.",
      order: 5,
    },
    {
      name: "Automation",
      slug: "automation",
      shortDescription: "Workflow and business process automation.",
      description:
        "Workflow automation, integrations and systems that help businesses save time and reduce manual work.",
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        shortDescription: service.shortDescription,
        description: service.description,
        order: service.order,
        published: true,
      },
      create: {
        name: service.name,
        slug: service.slug,
        shortDescription: service.shortDescription,
        description: service.description,
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

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
    },
    create: {
      email,
      password: hashedPassword,
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
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
