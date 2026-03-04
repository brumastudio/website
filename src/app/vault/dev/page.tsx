import { redirect } from "next/navigation";
import { isAuthenticated } from "../lib/auth";
import { VaultHeader } from "../components/vault-header";

export default async function DevPage() {
  if (!(await isAuthenticated())) redirect("/vault");

  return (
    <>
      <VaultHeader
        label="The Vault"
        heading="Development"
        backHref="/vault"
        backLabel="Back to The Vault"
      />

      <main className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-md rounded-lg border border-grimoire-border border-dashed bg-grimoire-surface/50 p-8 text-center">
            <p className="font-ui text-sm text-grimoire-muted uppercase tracking-wider">
              Coming Soon
            </p>
            <p className="mt-2 font-body text-sm text-grimoire-text/50">
              Dev onboarding, coding standards, and architecture docs will be added here.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
