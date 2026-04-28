import { redirect } from "next/navigation";

export default async function SafetyShieldPrototype2BillPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = await params;
  redirect(`/xero-protect/prototype/2/${billId}`);
}
