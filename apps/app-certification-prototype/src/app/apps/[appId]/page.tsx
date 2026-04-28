import { notFound } from "next/navigation";
import { getApp } from "@/lib/mock/app";
import AppDetailsTabs from "./AppDetailsTabs";
import { AppShellFrame, PageHeader, getAppDetailsNavItems } from "@/components/nav";
import { Button } from "@/components/form";
import CertificationBanner from "./CertificationBanner";

export default async function AppDetailsPage({
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
          title="App details"
          actions={
            <>
              <Button variant="tertiary">Save</Button>
              <button
                aria-label="More options"
                className="ml-1 flex h-[34px] w-[34px] items-center justify-center rounded hover:bg-background-tertiary"
              >
                <span className="flex flex-col gap-[3px]">
                  <span className="h-[3px] w-[3px] rounded-full bg-content-secondary" />
                  <span className="h-[3px] w-[3px] rounded-full bg-content-secondary" />
                  <span className="h-[3px] w-[3px] rounded-full bg-content-secondary" />
                </span>
              </button>
            </>
          }
        />
      }
    >
      <div className="mx-auto w-full max-w-[960px] px-6 py-6">
        <CertificationBanner app={app} />
        <AppDetailsTabs app={app} />
      </div>
    </AppShellFrame>
  );
}
