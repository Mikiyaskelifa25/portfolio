"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2, Send, TriangleAlert } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/app/contact/actions";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", message: "" };
const MAX_MESSAGE = 4000;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [count, setCount] = useState(0);

  const errors = state.fieldErrors ?? {};
  const succeeded = state.status === "success";

  // Clear the fields once a message has been sent successfully. The native
  // reset event (below) resets the character counter.
  useEffect(() => {
    if (succeeded) {
      formRef.current?.reset();
    }
  }, [succeeded]);

  const inputClass = (invalid?: boolean) =>
    cn(
      "w-full rounded-xl border bg-ink/40 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-lime/60 focus:ring-2 focus:ring-lime/15",
      invalid ? "border-red-400/60" : "border-line",
    );

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      onReset={() => setCount(0)}
      className="rounded-2xl border border-line bg-surface/50 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            placeholder="Your name"
            className={cn("mt-2", inputClass(Boolean(errors.name)))}
          />
          {errors.name ? <FieldError>{errors.name}</FieldError> : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            placeholder="you@example.com"
            className={cn("mt-2", inputClass(Boolean(errors.email)))}
          />
          {errors.email ? <FieldError>{errors.email}</FieldError> : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="subject"
            className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase"
          >
            Subject <span className="normal-case text-muted/60">(optional)</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="What's this about?"
            className={cn("mt-2", inputClass())}
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="message"
              className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase"
            >
              Message
            </label>
            <span className="font-mono text-[11px] text-muted/60">
              {count}/{MAX_MESSAGE}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={MAX_MESSAGE}
            onChange={(event) => setCount(event.target.value.length)}
            aria-invalid={Boolean(errors.message)}
            placeholder="Tell me about the project, role or idea…"
            className={cn("mt-2 resize-y", inputClass(Boolean(errors.message)))}
          />
          {errors.message ? <FieldError>{errors.message}</FieldError> : null}
        </div>
      </div>

      {/* Honeypot — hidden from humans, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
          <Send
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              !pending && "group-hover:translate-x-0.5",
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      <div aria-live="polite" className="mt-4 min-h-0">
        {state.status !== "idle" ? (
          <p
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm",
              succeeded
                ? "border-lime/30 bg-lime/10 text-lime"
                : "border-red-400/30 bg-red-400/10 text-red-400",
            )}
          >
            {succeeded ? (
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <TriangleAlert className="h-4 w-4" aria-hidden="true" />
            )}
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-xs text-red-400" aria-live="polite">
      {children}
    </p>
  );
}
