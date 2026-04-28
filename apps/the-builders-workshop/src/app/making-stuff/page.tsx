import { HomeContent } from "@/components/home/home-content";
import { getBuilders } from "@/lib/builders";

export default function MakingStuffPage() {
  const builders = getBuilders();

  return <HomeContent builders={builders} activeTab="Build your first projects" />;
}
