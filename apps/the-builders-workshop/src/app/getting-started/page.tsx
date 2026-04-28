import { HomeContent } from "@/components/home/home-content";
import { getBuilders } from "@/lib/builders";

export default function GettingStartedPage() {
  const builders = getBuilders();

  return <HomeContent builders={builders} activeTab="Install the tools" />;
}


