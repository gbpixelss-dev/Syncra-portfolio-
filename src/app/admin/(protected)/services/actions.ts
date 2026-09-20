"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdminSession, UnauthorizedError } from "@/lib/authz";
import { serviceSchema } from "@/lib/validation/service";
import type { ActionResult } from "@/lib/admin-action-result";

function parseServiceForm(formData: FormData) {
  return serviceSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    published: formData.get("published") === "on",
  });
}

function revalidatePublicServicePages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/services");
  if (slug) revalidatePath(`/services/${slug}`);
  revalidatePath("/services/[slug]", "page");
}

export async function createService(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, error: "You must be signed in." };
    }
    throw error;
  }

  const parsed = parseServiceForm(formData);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const service = await prisma.service.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        shortDescription: parsed.data.shortDescription,
        description: parsed.data.description,
        published: parsed.data.published,
      },
    });
    revalidatePublicServicePages(service.slug);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { slug: ["A service with this slug already exists."] },
      };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, error: "You must be signed in." };
    }
    throw error;
  }

  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: "Service not found." };
  }

  const parsed = parseServiceForm(formData);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Safer implementation: a published service's slug can never change
  // through this form, regardless of what was submitted — public URLs
  // must never silently break. The slug field is also disabled in the
  // UI once published; this is the server-side enforcement of that.
  const nextSlug = existing.published ? existing.slug : parsed.data.slug;

  try {
    await prisma.service.update({
      where: { id },
      data: {
        name: parsed.data.name,
        slug: nextSlug,
        shortDescription: parsed.data.shortDescription,
        description: parsed.data.description,
        published: parsed.data.published,
      },
    });
    revalidatePublicServicePages(existing.slug);
    if (nextSlug !== existing.slug) revalidatePublicServicePages(nextSlug);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { slug: ["A service with this slug already exists."] },
      };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  redirect("/admin/services");
}
