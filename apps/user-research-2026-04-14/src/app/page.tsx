import { redirect } from "next/navigation";

/** Avoid stale CDN cache of `/` after Vercel Deployment Protection (password) flow. */
export const dynamic = "force-dynamic";

export default function HomePage() {
  redirect("/xero-protect/prototype/9/bills");
}
