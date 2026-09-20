import "server-only";
import { Resend } from "resend";

/**
 * SERVER-ONLY. Sends the inquiry notification email to SYNCra's
 * configured address. Never throws out to the caller — a failed
 * send is logged server-side and returns { sent: false } so the
 * inquiry Server Action can still report success to the visitor
 * (the inquiry itself is already safely persisted by the time this
 * runs — see Phase 9 spec, "email failure must not roll back a
 * successful database write").
 */

export type InquiryEmailPayload = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  preferredContact: string;
  serviceNames: string[];
  budget?: string;
  timeline?: string;
  currentWebsite?: string;
  description: string;
  submittedAt: Date;
};

function renderEmailText(payload: InquiryEmailPayload): string {
  const lines = [
    `New project inquiry from ${payload.name}`,
    "",
    `Name: ${payload.name}`,
    payload.company ? `Company: ${payload.company}` : null,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Preferred contact: ${payload.preferredContact}`,
    `Services: ${payload.serviceNames.join(", ")}`,
    payload.budget ? `Budget: ${payload.budget}` : null,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    payload.currentWebsite ? `Current website: ${payload.currentWebsite}` : null,
    "",
    "Project description:",
    payload.description,
    "",
    `Submitted: ${payload.submittedAt.toISOString()}`,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

function renderEmailHtml(payload: InquiryEmailPayload): string {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:4px 12px 4px 0;color:#6e7a7d;">${label}</td><td style="padding:4px 0;color:#1b2124;">${escapeHtml(value)}</td></tr>`
      : "";

  return `
    <div style="font-family:sans-serif;color:#1b2124;max-width:560px;">
      <p style="font-size:12px;letter-spacing:0.02em;color:#6e7a7d;text-transform:uppercase;">New project inquiry</p>
      <table cellspacing="0" cellpadding="0" style="font-size:14px;">
        ${row("Name", payload.name)}
        ${row("Company", payload.company)}
        ${row("Email", payload.email)}
        ${row("Phone", payload.phone)}
        ${row("Preferred contact", payload.preferredContact)}
        ${row("Services", payload.serviceNames.join(", "))}
        ${row("Budget", payload.budget)}
        ${row("Timeline", payload.timeline)}
        ${row("Current website", payload.currentWebsite)}
      </table>
      <p style="font-size:12px;letter-spacing:0.02em;color:#6e7a7d;text-transform:uppercase;margin-top:16px;">Project description</p>
      <p style="font-size:14px;white-space:pre-wrap;">${escapeHtml(payload.description)}</p>
      <p style="font-size:12px;color:#6e7a7d;margin-top:16px;">Submitted ${payload.submittedAt.toISOString()}</p>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendInquiryNotification(
  payload: InquiryEmailPayload
): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_ADDRESS;
  const to = process.env.INQUIRY_NOTIFICATION_ADDRESS;

  if (!apiKey || !from || !to) {
    console.error(
      "Inquiry notification email skipped — RESEND_API_KEY, " +
        "RESEND_FROM_ADDRESS, or INQUIRY_NOTIFICATION_ADDRESS is not configured."
    );
    return { sent: false };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `New project inquiry — ${payload.name}`,
      text: renderEmailText(payload),
      html: renderEmailHtml(payload),
    });
    return { sent: true };
  } catch (error) {
    // Never leak API key/error internals — log server-side only.
    console.error("Inquiry notification email failed to send:", error);
    return { sent: false };
  }
}
