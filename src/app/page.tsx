import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { GrimoirePreview } from "@/components/home/grimoire-preview";
import { CredibilityStrip } from "@/components/home/credibility-strip";
import { CtaStrip } from "@/components/home/cta-strip";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bruma Studio",
  url: "https://brumastudio.dev",
  description:
    "Bilingual digital studio specializing in Next.js, Sanity CMS, and modern web development.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tijuana",
    addressCountry: "MX",
  },
  sameAs: [
    "https://github.com/brumastudio",
    "https://x.com/brumastudio",
    "https://linkedin.com/company/brumastudio",
    "https://instagram.com/brumastudio",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ServicesPreview />
      <GrimoirePreview />
      <CredibilityStrip />
      <CtaStrip />
    </>
  );
}
