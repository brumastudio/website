"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

const projectTypeKeys = ["website", "cms", "design", "other"] as const;
const budgetRangeKeys = ["under3k", "3kTo5k", "5kTo10k", "over10k", "notSure"] as const;

const inputStyles =
  "w-full bg-grimoire-surface border border-grimoire-border rounded-md px-4 py-3 text-grimoire-text font-body text-base md:text-lg leading-relaxed placeholder:text-grimoire-muted focus:border-grimoire-gold focus:ring-1 focus:ring-grimoire-gold/50 focus:outline-none transition-colors duration-200";

const labelStyles =
  "block font-ui text-sm text-grimoire-muted uppercase tracking-wider mb-2";

export function ContactForm() {
  const t = useTranslations("ContactForm");
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
          {t("successTitle")}
        </h3>
        <p className="mt-4 max-w-sm font-body text-base md:text-lg leading-relaxed text-grimoire-text">
          {t("successBody")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelStyles}>
          {t("nameLabel")} <span className="text-grimoire-gold">{t("required")}</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputStyles}
          placeholder={t("namePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelStyles}>
          {t("emailLabel")} <span className="text-grimoire-gold">{t("required")}</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputStyles}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="projectType" className={labelStyles}>
          {t("projectTypeLabel")}
        </label>
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            className={inputStyles + " appearance-none pr-10"}
            defaultValue=""
          >
            <option value="" disabled>
              {t("projectTypePlaceholder")}
            </option>
            {projectTypeKeys.map((key) => (
              <option key={key} value={key}>
                {t(`projectTypes.${key}`)}
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
          {t("budgetLabel")}
        </label>
        <div className="relative">
          <select
            id="budget"
            name="budget"
            className={inputStyles + " appearance-none pr-10"}
            defaultValue=""
          >
            <option value="" disabled>
              {t("budgetPlaceholder")}
            </option>
            {budgetRangeKeys.map((key) => (
              <option key={key} value={key}>
                {t(`budgetRanges.${key}`)}
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
          {t("messageLabel")}{" "}
          <span className="text-grimoire-gold">{t("required")}</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={inputStyles + " resize-none"}
          placeholder={t("messagePlaceholder")}
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
        className="w-full font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t("sending") : t("sendMessage")}
      </button>
    </form>
  );
}
