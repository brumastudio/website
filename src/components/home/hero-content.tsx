"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

/**
 * Hero text content with staggered fade-in animation.
 * Respects prefers-reduced-motion via framer-motion's built-in support.
 */
export function HeroContent() {
  const t = useTranslations("Home.hero");

  return (
    <>
      <motion.h1
        className="font-display text-5xl md:text-7xl text-grimoire-gold uppercase tracking-wide text-balance"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        {t("title")}
      </motion.h1>

      <motion.p
        className="mt-4 font-body text-xl italic text-grimoire-gold-light"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        {t("tagline")}
      </motion.p>

      <motion.div
        className="mt-6 h-px w-24 bg-grimoire-gold/40"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      />

      <motion.p
        className="mt-8 max-w-lg font-body text-lg leading-relaxed text-grimoire-text"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        {t("body")}
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <Link
          href="/summon"
          className="font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200"
        >
          {t("ctaPrimary")}
        </Link>
        <a
          href="#grimoire"
          className="font-ui text-sm font-medium uppercase tracking-wider border border-grimoire-gold text-grimoire-gold px-6 py-3 rounded-md hover:bg-grimoire-gold/10 active:scale-95 transition-all duration-200"
        >
          {t("ctaSecondary")}
        </a>
      </motion.div>
    </>
  );
}
