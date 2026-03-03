import type { Metadata } from "next";
import { Cinzel, Crimson_Text, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://brumastudio.dev"),
  title: {
    default: "Bruma Studio — Dark arts of digital craft",
    template: "%s — Bruma Studio",
  },
  description:
    "Bruma Studio is a bilingual digital studio specializing in Next.js, Sanity CMS, and modern web development. Custom websites built with craft and intention.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brumastudio.dev",
    siteName: "Bruma Studio",
    title: "Bruma Studio — Dark arts of digital craft",
    description:
      "Bilingual digital studio specializing in Next.js, Sanity CMS, and modern web development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bruma Studio — Dark arts of digital craft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@brumastudio",
    creator: "@brumastudio",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    types: {
      "application/rss+xml": "/scrolls/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${crimsonText.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-grimoire-bg text-grimoire-text antialiased">
        {children}
      </body>
    </html>
  );
}
