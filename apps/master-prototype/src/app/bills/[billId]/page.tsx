import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSafetyShieldBillById } from "@/data/safety-shield";
import { formatCurrency } from "@/components/xero-protect/SafetyShieldChrome";

type Props = { params: Promise<{ billId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { billId } = await params;
  const bill = getSafetyShieldBillById(billId);
  return { title: bill ? `${bill.supplier} — Bills` : "Bill" };
}

export default async function BillDetailPage({ params }: Props) {
  const { billId } = await params;
  const bill = getSafetyShieldBillById(billId);
  if (!bill) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-content-primary">
      <p className="text-[13px] text-content-secondary">
        <Link href="/bills" className="text-brand-primary hover:underline">
          Bills
        </Link>
        <span className="mx-1 text-content-tertiary" aria-hidden>
          /
        </span>
        <span>Prototype detail</span>
      </p>
      <h1 className="mt-4 text-[22px] font-semibold leading-tight">{bill.supplier}</h1>
      <p className="mt-2 text-[15px] text-content-secondary">
        {bill.billNumber} · Due {bill.dueDate}
      </p>
      <p className="mt-6 text-[17px] font-medium">{formatCurrency(bill.total)}</p>
      <p className="mt-8 text-[13px] leading-relaxed text-content-secondary">
        This page is for deep links and quick checks against sample bills. Use the main bills list for
        the full table experience.
      </p>
      <Link
        href="/bills"
        className="mt-6 inline-flex text-[14px] font-semibold text-brand-primary hover:underline"
      >
        Back to bills list
      </Link>
    </div>
  );
}
