import { permanentRedirect } from "next/navigation";

/** Legacy URL — canonical bills list is `/bills`. */
export default function PurchasesBillsRedirect() {
  permanentRedirect("/bills");
}
