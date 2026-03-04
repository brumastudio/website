import { setRequestLocale, getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RouteProgress } from "@/components/route-progress";
import { PageTransition } from "@/components/page-transition";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Common");

  return (
    <>
      <RouteProgress />
      <a href="#main" className="skip-to-content">
        {t("skipToContent")}
      </a>
      <Nav />
      <main id="main">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
