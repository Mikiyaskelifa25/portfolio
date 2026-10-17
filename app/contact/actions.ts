"use server";

import {
  sendTelegramMessage,
  telegramConfigured,
  escapeHtml,
} from "@/lib/telegram";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function clip(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = read(formData, "name");
  const email = read(formData, "email");
  const subject = read(formData, "subject");
  const message = read(formData, "message");
  const honeypot = read(formData, "company");

  // Simple bot trap: a real person never fills the hidden "company" field.
  if (honeypot) {
    return { status: "success", message: "Thanks — your message was sent." };
  }

  const fieldErrors: Record<string, string> = {};

  if (!name) fieldErrors.name = "Please add your name.";
  else if (name.length > 80) fieldErrors.name = "Name is too long.";

  if (!email) fieldErrors.email = "Please add your email.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "That email looks invalid.";

  if (!message) fieldErrors.message = "Please write a message.";
  else if (message.length < 10)
    fieldErrors.message = "A little more detail, please (10+ characters).";
  else if (message.length > 4000)
    fieldErrors.message = "Message is too long (4000 characters max).";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  if (!telegramConfigured()) {
    return {
      status: "error",
      message:
        "Messaging isn't connected yet. Please try the email link instead.",
    };
  }

  const body = [
    "\u{1F4EC} <b>New message from your portfolio</b>",
    "",
    `<b>Name:</b> ${escapeHtml(clip(name, 80))}`,
    `<b>Email:</b> ${escapeHtml(clip(email, 120))}`,
    subject ? `<b>Subject:</b> ${escapeHtml(clip(subject, 160))}` : null,
    "",
    escapeHtml(clip(message, 4000)),
    "",
    `<i>Sent from mikiyas.dev contact form</i>`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendTelegramMessage(body);
  } catch (error) {
    console.error("[contact] Telegram send failed:", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again or email me.",
    };
  }

  return {
    status: "success",
    message: "Message sent — thank you! I'll get back to you soon.",
  };
}
