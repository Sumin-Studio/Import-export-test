import Link from "next/link";

export default function XeroProtectAuditsIndexPage() {
  return (
    <div className="min-h-full bg-[#f4f5f7] px-6 py-6">
      <div className="max-w-[980px] mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="text-[30px] font-bold text-[#172b4d]">Xero Protect audits</h1>
          <p className="text-[14px] text-[#42526e]">
            Choose an audit view.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/xero-protect/audits/cta"
            className="rounded-lg border border-[#dfe1e6] bg-white p-5 hover:border-[#4c9aff] hover:shadow-sm transition"
          >
            <h2 className="text-[18px] font-semibold text-[#172b4d]">CTA audit</h2>
            <p className="mt-1 text-[13px] text-[#42526e]">
              Bill-detail CTA state grid and warning combinations.
            </p>
          </Link>

          <Link
            href="/xero-protect/audits/contentaudit"
            className="rounded-lg border border-[#dfe1e6] bg-white p-5 hover:border-[#4c9aff] hover:shadow-sm transition"
          >
            <h2 className="text-[18px] font-semibold text-[#172b4d]">Content blurb library</h2>
            <p className="mt-1 text-[13px] text-[#42526e]">
              Scenario blurbs for summary, context, and recommended actions.
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
