import { notFound } from "next/navigation";
import { getApp } from "@/lib/mock/app";
import { AppShellFrame, PageHeader, getAppDetailsNavItems } from "@/components/nav";
import { Button, Field, TextInput } from "@/components/form";

export default async function ConfigurationPage({
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
          title="Configuration"
          actions={<Button variant="tertiary">Save</Button>}
        />
      }
    >
      <div className="mx-auto w-full max-w-[960px] px-6 py-6">
        <div className="rounded-lg border border-border-secondary bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[16px] font-bold">Connection</div>
            <div className="text-[12px] text-content-secondary">
              {app.connections} of {app.maxConnections} connections
            </div>
          </div>
          <div className="flex max-w-[560px] flex-col gap-5">
            <Field label="Redirect URIs" htmlFor="cfg-redirect">
              <TextInput id="cfg-redirect" defaultValue={app.redirectUri} />
            </Field>
            <Field label="Client id">
              <div className="flex h-10 items-center rounded bg-background-tertiary/50 px-3 text-[14px] text-content-secondary">
                C0•••••••••••••••••54
              </div>
            </Field>
            <Field label="Client secret 1">
              <div className="flex h-10 items-center rounded bg-background-tertiary/50 px-3 text-[13px] text-content-secondary">
                Created at 2026-02-12T20:51:29Z
              </div>
            </Field>
          </div>
        </div>
      </div>
    </AppShellFrame>
  );
}
