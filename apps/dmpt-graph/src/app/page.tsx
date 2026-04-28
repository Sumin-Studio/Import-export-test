import { HomePageClient } from "./HomePageClient";

export default function HomePage() {
  const jiraBrowseBase = (process.env.NEXT_PUBLIC_JIRA_BASE_URL ?? "").replace(/\/$/, "");
  return <HomePageClient jiraBrowseBase={jiraBrowseBase} />;
}
