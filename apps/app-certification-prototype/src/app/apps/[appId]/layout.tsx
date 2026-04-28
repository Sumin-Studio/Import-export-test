import { notFound } from "next/navigation";
import { Header } from "@/components/nav";
import { getApp } from "@/lib/mock/app";

export default async function AppShellLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  const app = getApp(appId);
  if (!app) notFound();

  return (
    <>
      <Header selected="My Apps" />
      <div className="flex min-h-screen flex-col pt-[60px]">{children}</div>
    </>
  );
}
