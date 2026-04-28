import { HomeContent } from "@/components/home/home-content";
import { getBuilders } from "@/lib/builders";

export default function GetInspiredPage() {
  const builders = getBuilders();

  return <HomeContent builders={builders} activeTab="Get Inspired" />;
}
