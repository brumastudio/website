import { isAuthenticated } from "./lib/auth";
import { VaultLogin } from "./components/vault-login";
import { VaultHeader } from "./components/vault-header";
import { BookOpen, Code2 } from "lucide-react";

const departments = [
  {
    title: "Sales",
    description: "Prospecting playbooks, commission guides, and outreach templates.",
    href: "/vault/sales",
    icon: BookOpen,
  },
  {
    title: "Development",
    description: "Onboarding docs, coding standards, and architecture guides.",
    href: "/vault/dev",
    icon: Code2,
  },
];

export default async function VaultPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return <VaultLogin />;
  }

  return (
    <>
      <VaultHeader label="Internal Resources" heading="The Vault" />

      <main className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
            {departments.map((dept) => (
              <a
                key={dept.title}
                href={dept.href}
                className="group rounded-lg border border-grimoire-border bg-grimoire-surface p-6 transition-all duration-300 hover:border-grimoire-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.06)]"
              >
                <dept.icon className="w-6 h-6 text-grimoire-gold mb-4" />
                <h2 className="font-display text-xl text-grimoire-gold uppercase tracking-wide">
                  {dept.title}
                </h2>
                <p className="mt-2 font-body text-sm text-grimoire-text/70 leading-relaxed">
                  {dept.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
