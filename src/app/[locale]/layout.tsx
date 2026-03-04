import type { Metadata } from "next";
import { Cinzel, Crimson_Text, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson-text",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    metadataBase: new URL("https://brumastudio.dev"),
    title: {
      default: t("titleDefault"),
      template: `%s — Bruma Studio`,
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_MX",
      url: `https://brumastudio.dev/${locale}`,
      siteName: "Bruma Studio",
      title: t("titleDefault"),
      description: t("ogDescription"),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("titleDefault"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@brumastudio",
      creator: "@brumastudio",
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/apple-icon",
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: `https://brumastudio.dev/${locale}`,
      languages: {
        [locale]: `https://brumastudio.dev/${locale}`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}`,
      },
      types: {
        "application/rss+xml": "/scrolls/feed.xml",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cinzel.variable} ${crimsonText.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="bg-grimoire-bg text-grimoire-text antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        {/* Noise texture overlay — dithers gradients to prevent 8-bit banding */}
        <div
          className="fixed inset-0 pointer-events-none z-50 bg-repeat opacity-[0.04]"
          style={{ backgroundImage: "url('/noise.svg')", backgroundSize: "200px 200px" }}
          aria-hidden="true"
        />
      </body>
    </html>
  );
}
