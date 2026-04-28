import { Xero } from "@/components/ui/icons";
import Link from "next/link";

export default function XeroLogo() {
  return (
    <Link
      href="/"
      className="rounded-medium focus:outline-none focus-visible:ring-2"
    >
      <Xero className="box-content h-10 w-14 px-3 text-white" />
    </Link>
  );
}
