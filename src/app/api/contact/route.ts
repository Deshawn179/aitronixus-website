import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, email: 200, organisation: 160, interest: 80, message: 4000 } as const;

type Payload = {
  name: string;
  email: string;
  organisation: string;
  interest: string;
  message: string;
  website?: string;
};

function clean(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

/**
 * Contact endpoint.
 *
 * Submission handling is configurable rather than hard-wired to one provider:
 * set AITRONIXUS_CONTACT_WEBHOOK to any endpoint that accepts a JSON POST — a
 * CRM webhook, a Power Automate flow, a Logic App, a transactional-mail proxy.
 * With nothing configured the submission is validated and logged, so the form
 * is genuinely functional in development and fails loudly rather than silently
 * in production.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ message: "Malformed request body." }, { status: 400 });
  }

  const body = (raw ?? {}) as Partial<Payload>;

  /* Honeypot: accept and discard, so a bot sees success and does not retry. */
  if (clean(body.website, 200)) {
    return NextResponse.json({ message: "Message received." }, { status: 200 });
  }

  const payload: Payload = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email),
    organisation: clean(body.organisation, MAX.organisation),
    interest: clean(body.interest, MAX.interest),
    message: clean(body.message, MAX.message),
  };

  const errors: string[] = [];
  if (payload.name.length < 2) errors.push("name");
  if (!EMAIL.test(payload.email)) errors.push("email");
  if (!payload.organisation) errors.push("organisation");
  if (payload.message.length < 20) errors.push("message");

  if (errors.length) {
    return NextResponse.json(
      { message: "Some fields need attention before we can send this.", fields: errors },
      { status: 422 },
    );
  }

  const webhook = process.env.AITRONIXUS_CONTACT_WEBHOOK;

  if (!webhook) {
    /* No destination configured yet. Validated, recorded, and clearly flagged. */
    console.info(
      "[aitronixus:contact] No AITRONIXUS_CONTACT_WEBHOOK configured — submission logged only.",
      {
        ...payload,
        receivedAt: new Date().toISOString(),
        intendedInbox: process.env.AITRONIXUS_CONTACT_INBOX ?? "(not configured)",
      },
    );
    return NextResponse.json({
      message:
        "Message received. Delivery is not configured on this deployment yet — see the README.",
    });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "aitronixus.com/contact",
        receivedAt: new Date().toISOString(),
        ...payload,
      }),
      /* Never let a slow downstream hold the request open indefinitely. */
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("[aitronixus:contact] Webhook rejected the submission", res.status);
      return NextResponse.json(
        { message: "We could not deliver that message. Please try again shortly." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[aitronixus:contact] Webhook request failed", error);
    return NextResponse.json(
      { message: "We could not deliver that message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Message received. An engineer will read it and reply directly.",
  });
}
