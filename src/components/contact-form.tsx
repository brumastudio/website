"use client";

import { useState, type FormEvent } from "react";

const projectTypes = ["Website", "CMS", "Design", "Other"];
const budgetRanges = [
  "Under $3K",
  "$3K–$5K",
  "$5K–$10K",
  "$10K+",
  "Not sure yet",
];

const inputStyles =
  "w-full bg-grimoire-surface border border-grimoire-border rounded-md px-4 py-3 text-grimoire-text font-body text-base placeholder:text-grimoire-muted focus:border-grimoire-gold focus:ring-1 focus:ring-grimoire-gold/50 focus:outline-none transition-colors duration-200";

const labelStyles =
  "block font-ui text-sm text-grimoire-muted uppercase tracking-wider mb-2";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-grimoire-border bg-grimoire-surface p-12 text-center">
        <h3 className="font-display text-2xl uppercase tracking-wide text-grimoire-gold">
          Message Received
        </h3>
        <p className="mt-4 max-w-sm font-body text-base leading-relaxed text-grimoire-text">
          We&rsquo;ll be in touch within 24 hours. Thank you for reaching out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelStyles}>
          Name <span className="text-grimoire-gold">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputStyles}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelStyles}>
          Email <span className="text-grimoire-gold">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputStyles}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="projectType" className={labelStyles}>
          Project Type
        </label>
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            className={inputStyles + " appearance-none pr-10"}
            defaultValue=""
          >
            <option value="" disabled>
              Select a type…
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-grimoire-muted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelStyles}>
          Budget Range
        </label>
        <div className="relative">
          <select
            id="budget"
            name="budget"
            className={inputStyles + " appearance-none pr-10"}
            defaultValue=""
          >
            <option value="" disabled>
              Select a range…
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-grimoire-muted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelStyles}>
          Tell Us About Your Project{" "}
          <span className="text-grimoire-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={inputStyles + " resize-none"}
          placeholder="Describe your vision…"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="font-ui text-sm text-grimoire-error">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
