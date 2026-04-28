import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center text-content-primary">
      <p className="text-[13px] font-medium uppercase tracking-wide text-content-secondary">
        404
      </p>
      <h1 className="mt-2 text-[22px] font-semibold leading-tight">This page could not be found</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-content-secondary">
        The link may be wrong, or this demo does not include that item.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex text-[14px] font-semibold text-brand-primary hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}
