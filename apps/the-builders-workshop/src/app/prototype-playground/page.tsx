import { HomeContent } from "@/components/home/home-content";
import { getBuilders } from "@/lib/builders";

export default function PrototypePlaygroundPage() {
  const builders = getBuilders();

  return <HomeContent builders={builders} activeTab="Prototype Playground" showTabs={false} />;
}



