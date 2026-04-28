import { notFound } from "next/navigation";
import { getApp } from "@/lib/mock/app";
import { AppShellFrame, PageHeader, getAppDetailsNavItems } from "@/components/nav";

export default async function BillingPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  const app = getApp(appId);
  if (!app) notFound();

  const navItems = getAppDetailsNavItems(appId);

  return (
    <AppShellFrame
      navItems={navItems}
      header={
        <PageHeader
          breadcrumbs={[{ label: "Apps", href: "/" }, { label: app.name }]}
          title="Billing"
        />
      }
    >
      <div className="mx-auto w-full max-w-[960px] px-6 py-6">
        <div className="rounded-lg border border-border-secondary bg-white p-6 text-[14px] text-content-secondary">
          Stubbed in this prototype.
        </div>
      </div>
    </AppShellFrame>
  );
}
