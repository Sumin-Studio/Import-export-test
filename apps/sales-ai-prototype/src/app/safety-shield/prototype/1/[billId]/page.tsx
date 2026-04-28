import { redirect } from "next/navigation";

export default async function SafetyShieldPrototype1BillPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = await params;
  redirect(`/xero-protect/prototype/1/${billId}`);
}
