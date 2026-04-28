import { redirect } from "next/navigation";

export default async function SafetyShieldPrototype3BillPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = await params;
  redirect(`/xero-protect/prototype/3/bills/${billId}`);
}
