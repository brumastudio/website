import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
