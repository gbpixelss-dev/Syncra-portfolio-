"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdminSession, UnauthorizedError } from "@/lib/authz";
import { technologySchema } from "@/lib/validation/technology";
import type { ActionResult } from "@/lib/admin-action-result";

function parseTechnologyForm(formData: FormData) {
  return technologySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    category: formData.get("category"),
  });
}

function revalidatePublicTechnologyPages() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/portfolio/[slug]", "page");
  revalidatePath("/services/[slug]", "page");
}

export async function createTechnology(
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

  const parsed = parseTechnologyForm(formData);
  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.technology.create({ data: parsed.data });
    revalidatePublicTechnologyPages();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { slug: ["A technology with this slug already exists."] },
      };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  redirect("/admin/technologies");
}

export async function updateTechnology(
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

  const parsed = parseTechnologyForm(formData);
  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.technology.update({ where: { id }, data: parsed.data });
    revalidatePublicTechnologyPages();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { slug: ["A technology with this slug already exists."] },
      };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  redirect("/admin/technologies");
}

/**
 * Delete-safety: a technology used by at least one project is never
 * silently deleted — the relationship rows would orphan and the
 * public tech-filter/tag data would misrepresent real projects.
 * Blocking is the safer choice the spec asked for over cascading.
 */
export async function deleteTechnology(id: string): Promise<{ error?: string }> {
  await requireAdminSession();

  const usageCount = await prisma.projectTechnology.count({
    where: { technologyId: id },
  });

  if (usageCount > 0) {
    return {
      error: `Can't delete — used by ${usageCount} project${usageCount === 1 ? "" : "s"}. Remove it from those projects first.`,
    };
  }

  await prisma.technology.delete({ where: { id } });
  revalidatePublicTechnologyPages();
  redirect("/admin/technologies");
}
