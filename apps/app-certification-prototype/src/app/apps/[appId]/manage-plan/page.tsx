import { notFound } from "next/navigation";
import { getApp } from "@/lib/mock/app";
import { AppShellFrame, PageHeader, getAppDetailsNavItems } from "@/components/nav";
import ManagePlanContent from "./ManagePlanContent";

export default async function ManagePlanPage({
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
          title="Manage plan"
        />
      }
    >
      <div className="mx-auto w-full max-w-[960px] px-6 py-6">
        <ManagePlanContent app={app} />
      </div>
    </AppShellFrame>
  );
}
