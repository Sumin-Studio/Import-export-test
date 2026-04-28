import { Suspense } from "react";
import { getClientById } from "@/data/clients";
import { Cloud, Loader2 } from "lucide-react";
import { FolderPicker } from "./FolderPicker";

export default async function ConnectFolderPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClientById(clientId);

  if (!client) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8">
        <p className="text-slate-600">This link is invalid or has expired.</p>
      </div>
    );
  }

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
        <Suspense
          fallback={
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Loading…
            </div>
          }
        >
          <FolderPicker clientId={clientId} />
        </Suspense>
      </div>
    </div>
  );
}
