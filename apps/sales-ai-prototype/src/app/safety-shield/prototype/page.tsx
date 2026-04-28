import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Safety Shield prototypes",
};

export default function SafetyShieldPrototypeIndexPage() {
  redirect("/xero-protect/prototype");
}
