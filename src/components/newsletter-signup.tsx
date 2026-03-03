"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export function NewsletterSignup() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-grimoire-gold/20 bg-grimoire-surface rounded-lg p-8 text-center">
        <p className="font-display text-lg text-grimoire-gold uppercase tracking-wide">
          {t("successTitle")}
        </p>
        <p className="mt-2 font-body text-base md:text-lg leading-relaxed text-grimoire-text">
          {t("successBody")}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-grimoire-border bg-grimoire-surface rounded-lg p-8">
      <p className="font-display text-lg text-grimoire-gold uppercase tracking-wide text-center">
        {t("title")}
      </p>
      <p className="mt-3 font-body text-base md:text-lg leading-relaxed text-grimoire-text text-center">
        {t("body")}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          placeholder={t("placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "sending"}
          className="flex-1 bg-grimoire-bg border border-grimoire-border rounded-md px-4 py-2.5 font-ui text-sm text-grimoire-text placeholder:text-grimoire-muted focus:border-grimoire-gold focus:ring-1 focus:ring-grimoire-gold/50 outline-none transition-colors duration-200 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-5 py-2.5 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200 disabled:opacity-50 shrink-0"
        >
          {status === "sending" ? t("sending") : t("subscribe")}
        </button>
      </form>

      {status === "error" && (
        <p role="alert" className="mt-3 text-center font-ui text-xs text-grimoire-error">
          {errorMessage}
        </p>
      )}

      <p className="mt-4 font-ui text-xs text-grimoire-muted text-center">
        {t("frequency")}
      </p>
    </div>
  );
}
