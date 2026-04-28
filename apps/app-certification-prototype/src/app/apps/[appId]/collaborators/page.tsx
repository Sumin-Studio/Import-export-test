import { notFound } from "next/navigation";
import { getApp } from "@/lib/mock/app";
import { AppShellFrame, PageHeader, getAppDetailsNavItems } from "@/components/nav";
import { Button } from "@/components/form";

export default async function CollaboratorsPage({
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
          title="Collaborators"
          actions={<Button>Invite collaborator</Button>}
        />
      }
    >
      <div className="mx-auto w-full max-w-[960px] px-6 py-6">
        <div className="rounded-lg border border-border-secondary bg-white p-6">
          <div className="text-[16px] font-bold">
            Manage access and ownership of this app
          </div>
          <div className="mt-2 text-[14px] text-content-secondary">
            Get the right people involved at the right time. Invite up to 20
            collaborators. (Stubbed in this prototype.)
          </div>
        </div>
      </div>
    </AppShellFrame>
  );
}
