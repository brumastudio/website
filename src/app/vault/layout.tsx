import type { Metadata } from "next";
import { Cinzel, Crimson_Text, Inter, JetBrains_Mono } from "next/font/google";

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
  title: "The Vault — Bruma Studio",
  robots: { index: false, follow: false },
};

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${crimsonText.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-grimoire-bg text-grimoire-text antialiased min-h-screen">
        {children}
        <div
          className="fixed inset-0 pointer-events-none z-50 bg-repeat opacity-[0.04]"
          style={{ backgroundImage: "url('/noise.svg')", backgroundSize: "200px 200px" }}
          aria-hidden="true"
        />
      </body>
    </html>
  );
}
