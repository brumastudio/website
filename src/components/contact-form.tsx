"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projectTypeKeys = ["website", "cms", "design", "other"] as const;
const contactPreferenceKeys = ["phone", "email", "whatsapp"] as const;
type ContactPreference = (typeof contactPreferenceKeys)[number];

const countryCodes = [
  { value: "+52", flag: "🇲🇽", label: "MX" },
  { value: "+1", flag: "🇺🇸", label: "US" },
] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const contactPreferenceIcons: Record<
  ContactPreference,
  (props: { className?: string }) => ReactNode
> = {
  phone: ({ className }) => <Phone className={className} aria-hidden="true" />,
  email: ({ className }) => <Mail className={className} aria-hidden="true" />,
  whatsapp: ({ className }) => <WhatsAppIcon className={className} />,
};

const inputStyles =
  "w-full min-h-[44px] bg-grimoire-surface-elevated border border-grimoire-border rounded-md px-4 py-3 text-grimoire-text font-body text-base md:text-lg leading-relaxed placeholder:text-grimoire-muted focus:border-grimoire-gold focus:ring-1 focus:ring-grimoire-gold/50 focus:outline-none transition-colors duration-200";

const inputErrorStyles =
  "border-grimoire-error focus:border-grimoire-error focus:ring-grimoire-error/30";

const labelStyles =
  "block font-ui text-sm text-grimoire-muted uppercase tracking-wider mb-2";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();

  const [countryCode, setCountryCode] = useState<string>(countryCodes[0].value);
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [contactPreference, setContactPreference] =
    useState<ContactPreference | "">("");
  const [contactPreferenceTouched, setContactPreferenceTouched] =
    useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef<HTMLDivElement | null>(null);

  const phoneValid = phone.length === 10;
  const phoneInvalid = phoneTouched && !phoneValid;
  const contactPreferenceInvalid = contactPreferenceTouched && !contactPreference;

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  function handlePhoneChange(value: string) {
    setPhone(value.replace(/\D/g, "").slice(0, 10));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPhoneTouched(true);
    setContactPreferenceTouched(true);

    if (!phoneValid || !contactPreference) {
      setStatus("error");
      setErrorMessage("");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement)
        .value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      countryCode,
      phone,
      contactPreference,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      locale,
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
      <motion.div
        ref={successRef}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center justify-center rounded-lg border border-grimoire-gold/30 bg-grimoire-surface p-12 text-center shadow-[0_0_40px_rgba(212,175,55,0.08)]"
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-grimoire-gold/40 bg-grimoire-gold/10"
        >
          <CheckCircle2 className="h-8 w-8 text-grimoire-gold" />
        </motion.div>
        <h3 className="font-display text-2xl uppercase tracking-wide text-grimoire-gold">
          {t("successTitle")}
        </h3>
        <p className="mt-4 max-w-sm font-body text-base md:text-lg leading-relaxed text-grimoire-text">
          {t("successBody")}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* First + Last name */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelStyles}>
            {t("firstNameLabel")}{" "}
            <span className="text-grimoire-gold">{t("required")}</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            className={inputStyles}
            placeholder={t("firstNamePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelStyles}>
            {t("lastNameLabel")}{" "}
            <span className="text-grimoire-gold">{t("required")}</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            autoComplete="family-name"
            className={inputStyles}
            placeholder={t("lastNamePlaceholder")}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelStyles}>
          {t("emailLabel")}{" "}
          <span className="text-grimoire-gold">{t("required")}</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className={inputStyles}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      {/* Country code + Phone */}
      <div>
        <label htmlFor="phone" className={labelStyles}>
          {t("phoneLabel")}{" "}
          <span className="text-grimoire-gold">{t("required")}</span>
        </label>
        <div className="grid gap-3 grid-cols-[auto_1fr]">
          <div className="relative">
            <label htmlFor="countryCode" className="sr-only">
              {t("countryCodeLabel")}
            </label>
            <select
              id="countryCode"
              name="countryCode"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className={cn(inputStyles, "appearance-none pr-10")}
            >
              {countryCodes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.flag} {c.value} {c.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-grimoire-muted">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            autoComplete="tel-national"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => setPhoneTouched(true)}
            aria-invalid={phoneInvalid || undefined}
            aria-describedby={phoneInvalid ? "phone-error" : undefined}
            className={cn(inputStyles, phoneInvalid && inputErrorStyles)}
            placeholder={t("phonePlaceholder")}
          />
        </div>
        {phoneInvalid && (
          <p
            id="phone-error"
            role="alert"
            className="mt-2 font-ui text-sm text-grimoire-error"
          >
            {t("phoneError")}
          </p>
        )}
      </div>

      {/* Contact preference */}
      <fieldset>
        <legend className={labelStyles}>
          {t("contactPreferenceLabel")}{" "}
          <span className="text-grimoire-gold">{t("required")}</span>
        </legend>
        <div
          role="radiogroup"
          aria-required="true"
          aria-invalid={contactPreferenceInvalid || undefined}
          className="grid grid-cols-3 gap-2"
        >
          {contactPreferenceKeys.map((key) => {
            const selected = contactPreference === key;
            const Icon = contactPreferenceIcons[key];
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  setContactPreference(key);
                  setContactPreferenceTouched(true);
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 min-h-[72px] px-2 py-3 rounded-md border font-ui text-xs md:text-sm text-center uppercase tracking-wider transition-all duration-200 active:scale-95",
                  selected
                    ? "border-grimoire-gold bg-grimoire-gold/10 text-grimoire-gold"
                    : "border-grimoire-border bg-grimoire-surface-elevated text-grimoire-text hover:border-grimoire-gold/40 hover:text-grimoire-gold"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{t(`contactPrefs.${key}`)}</span>
              </button>
            );
          })}
        </div>
        {contactPreferenceInvalid && (
          <p
            role="alert"
            className="mt-2 font-ui text-sm text-grimoire-error"
          >
            {t("contactPreferenceError")}
          </p>
        )}
      </fieldset>

      {/* Project type */}
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
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

      {status === "error" && errorMessage && (
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
