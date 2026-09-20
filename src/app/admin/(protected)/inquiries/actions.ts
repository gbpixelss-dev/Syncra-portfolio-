"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession, UnauthorizedError } from "@/lib/authz";
import { inquiryStatusSchema } from "@/lib/validation/inquiry";
import type { ActionResult } from "@/lib/admin-action-result";

/**
 * Inquiries are kept as a permanent record — deletion is intentionally
 * not implemented. An inquiry is a real business lead/contact record;
 * unlike a draft project or an unpublished service, there's no
 * public-facing harm in an old one existing, and destroying a lead
 * record has no real upside worth the risk of losing something an
 * admin didn't mean to delete. Status ("CLOSED") is the correct way
 * to archive one, not removal.
 */
export async function updateInquiryStatus(
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

  const parsed = inquiryStatusSchema.safeParse({
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await prisma.inquiry.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: "Inquiry not found." };
  }

  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status: parsed.data.status },
    });
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);

  return { success: true };
}
