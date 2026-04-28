import { HomeContent } from "@/components/home/home-content";
import { getBuilders } from "@/lib/builders";

export default function PromptGuidePage() {
  const builders = getBuilders();

  return <HomeContent builders={builders} activeTab="Prompt Guide" />;
}
