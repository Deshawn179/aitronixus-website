"use client";

import { useRef, useState } from "react";

import { interests } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "organisation" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

/* Deliberately permissive: the goal is to catch typos, not to adjudicate what
   counts as a valid address. Anything with a local part, an @ and a dotted
   domain passes. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: Record<string, string>): Errors {
  const errors: Errors = {};

  if (!data.name.trim()) errors.name = "Please tell us who you are.";
  else if (data.name.trim().length < 2) errors.name = "That name looks too short.";

  if (!data.email.trim()) errors.email = "We need an address to reply to.";
  else if (!EMAIL.test(data.email.trim())) errors.email = "That does not look like a valid email address.";

  if (!data.organisation.trim()) errors.organisation = "Which organisation are you writing from?";

  if (!data.message.trim()) errors.message = "Tell us what you are trying to build or fix.";
  else if (data.message.trim().length < 20)
    errors.message = "A little more detail will get you a far better first reply.";

  return errors;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      message: String(fd.get("message") ?? ""),
      /* Honeypot: a real person never fills this in. */
      website: String(fd.get("website") ?? ""),
    };

    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length) {
      setStatus("idle");
      /* Send focus to the first field that needs attention. */
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };

      if (!res.ok) {
        setStatus("error");
        setServerMessage(body.message ?? "We could not send that just now. Please try again.");
        return;
      }

      setStatus("sent");
      setServerMessage(body.message ?? "Message received.");
      form.reset();
    } catch {
      setStatus("error");
      setServerMessage(
        "The request could not reach us — check your connection, or try again in a moment.",
      );
    }
  }

  const fieldProps = (key: keyof Errors) => ({
    name: key,
    id: `contact-${key}`,
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    className: "field-input",
    onChange: () =>
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      }),
  });

  return (
    <form ref={formRef} id="contact-form" className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="contact-name" className="contact-form__label">
            Name <span aria-hidden="true">*</span>
          </label>
          <input type="text" autoComplete="name" required {...fieldProps("name")} />
          {errors.name && (
            <p id="contact-name-error" className="contact-form__error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-email" className="contact-form__label">
            Work email <span aria-hidden="true">*</span>
          </label>
          <input type="email" autoComplete="email" required {...fieldProps("email")} />
          {errors.email && (
            <p id="contact-email-error" className="contact-form__error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="contact-organisation" className="contact-form__label">
            Organisation <span aria-hidden="true">*</span>
          </label>
          <input type="text" autoComplete="organization" required {...fieldProps("organisation")} />
          {errors.organisation && (
            <p id="contact-organisation-error" className="contact-form__error">
              {errors.organisation}
            </p>
          )}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-interest" className="contact-form__label">
            Area of interest
          </label>
          <select id="contact-interest" name="interest" className="field-input" defaultValue={interests[0]}>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message" className="contact-form__label">
          What are you trying to build or fix? <span aria-hidden="true">*</span>
        </label>
        <textarea rows={5} required {...fieldProps("message")} />
        {errors.message && (
          <p id="contact-message-error" className="contact-form__error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — visually and programmatically hidden from people. */}
      <div aria-hidden="true" className="contact-form__trap">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__foot">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
          <span aria-hidden="true">→</span>
        </button>
        <p className="contact-form__note tech-label">
          Required fields are marked with an asterisk
        </p>
      </div>

      {/* One live region for every outcome, so a screen reader announces the
          result without the form needing to move focus. */}
      <p
        className="contact-form__status"
        data-state={status}
        role="status"
        aria-live="polite"
      >
        {status === "sent" && serverMessage}
        {status === "error" && serverMessage}
      </p>
    </form>
  );
}
