import { Outlet, useLoaderData } from "react-router";
import type { AppsData, AppEntry } from "~/types/apps";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { PageLayout } from "~/components/layout/PageLayout";
import { Sidebar } from "~/components/layout/Sidebar";

export async function clientLoader() {
  try {
    const response = await fetch("/apps.json");
    if (!response.ok) throw new Error("Failed to load apps.json");
    const data: AppsData = await response.json();
    return { apps: data };
  } catch {
    return { apps: {} as AppsData };
  }
}

function filterApps(
  apps: AppsData,
  tag: string
): Array<{ key: string; entry: AppEntry }> {
  return Object.entries(apps)
    .filter(
      ([key, entry]) =>
        key !== "design-internal" &&
        !entry.tags.includes("deleted") &&
        entry.tags.includes(tag)
    )
    .map(([key, entry]) => ({ key, entry }));
}

export default function AppLayout() {
  const { apps } = useLoaderData<typeof clientLoader>();

  const appsList = filterApps(apps, "app");

  return (
    <>
      <Header />
      <PageLayout sidebar={<Sidebar apps={appsList} />}>
        <Outlet context={{ apps }} />
      </PageLayout>
      <Footer />
    </>
  );
}
