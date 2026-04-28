import { HomeContent } from "@/components/home/home-content";
import { getBuilders } from "@/lib/builders";

export default function FluencyStatusPage() {
  const builders = getBuilders();

  return <HomeContent builders={builders} activeTab="Fluency Status" showTabs={false} />;
}



