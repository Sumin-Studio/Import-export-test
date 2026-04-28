import { permanentRedirect } from "next/navigation";

/** Legacy URL — canonical purchases overview is `/purchases-overview`. */
export default function LegacyPurchasesOverviewPathRedirect() {
  permanentRedirect("/purchases-overview");
}
