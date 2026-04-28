import { HomeContent } from "@/components/home/home-content";
import { getBuilders } from "@/lib/builders";

export default function ConnectingToGitHubPage() {
  const builders = getBuilders();

  return <HomeContent builders={builders} activeTab="Collaborate with your team" />;
}

