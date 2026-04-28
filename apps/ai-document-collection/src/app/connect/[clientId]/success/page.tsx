import { CheckCircle2, Cloud } from "lucide-react";
import { getToken, syncStoreFromPersistence } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ConnectSuccessPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  await syncStoreFromPersistence();
  const connection = getToken(clientId);
  const folderLabel = connection?.folderPath
    ? connection.folderPath.replace(/^\//, "")
    : "your chosen folder";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          <Cloud className="h-6 w-6 shrink-0 text-blue-600" aria-hidden />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900">AgenticCloud</span>
            <span className="text-xs font-medium text-slate-500">by Xero</span>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden />
          <h1 className="mt-4 text-xl font-semibold text-slate-900">
            You&apos;re all set
          </h1>
          <p className="mt-3 text-slate-600">
            Your accountant can now see the relevant documents from{" "}
            <strong className="text-slate-900">{folderLabel}</strong>.
          </p>
          {connection?.isDemo && (
            <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              <strong className="font-medium">Demo mode.</strong> No real cloud account was linked—this was a
              simulated connection for the prototype.
            </p>
          )}
          <p className="mt-4 text-sm text-slate-500">
            You can close this window and return to the accountant view in your browser to see documents and scan
            results for this client.
          </p>
        </div>
      </div>
    </div>
  );
}
