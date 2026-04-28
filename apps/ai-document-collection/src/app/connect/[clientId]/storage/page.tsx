import Link from "next/link";
import { getClientById } from "@/data/clients";
import { Button } from "@/components/ui/button";
import { Cloud, Sparkles } from "lucide-react";
import { getAppOriginFromHeaders } from "@/lib/app-url";

const PROVIDERS = [
  {
    id: "dropbox",
    name: "Dropbox",
    description: "Connect your Dropbox account",
    available: true,
  },
  {
    id: "gdrive",
    name: "Google Drive",
    description: "Connect your Google Drive",
    available: false,
  },
  {
    id: "onedrive",
    name: "OneDrive",
    description: "Connect your Microsoft OneDrive",
    available: false,
  },
  {
    id: "box",
    name: "Box",
    description: "Connect your Box account",
    available: false,
  },
] as const;

export default async function ConnectStoragePage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClientById(clientId);

  const appUrl = await getAppOriginFromHeaders();
  const dropboxConnectUrl = `${appUrl}/api/auth/dropbox?clientId=${encodeURIComponent(clientId)}&from=client`;

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
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-slate-900">
              Choose your cloud storage
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Select where your documents are stored. After connecting, you&apos;ll choose which folder the AI agent can scan.
            </p>
          </div>

          <div className="grid gap-3">
            {PROVIDERS.map((provider) => (
              <div
                key={provider.id}
                className={`rounded-xl border bg-white p-4 shadow-sm transition-colors ${
                  provider.available
                    ? "border-slate-200 hover:border-slate-300 hover:shadow"
                    : "border-slate-200 bg-slate-50/50 opacity-90"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">{provider.name}</p>
                    <p className="text-sm text-slate-500">{provider.description}</p>
                  </div>
                  {provider.available ? (
                    <Button size="sm" asChild>
                      <Link href={dropboxConnectUrl}>Connect</Link>
                    </Button>
                  ) : (
                    <span className="rounded-md bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500">
            Only Dropbox is available for now. More providers will be added soon.
          </p>

          <div className="rounded-xl border border-violet-200 bg-violet-50/80 p-4 shadow-sm">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white">
                <Sparkles className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0 space-y-2 text-left">
                <p className="text-sm font-medium text-violet-950">Try demo mode</p>
                <p className="text-sm text-violet-900/90">
                  Explore the full flow with a simulated Dropbox—realistic folders and files, no sign-in or Dropbox
                  account required. Perfect for demos and prototypes.
                </p>
                <Button size="sm" variant="secondary" className="bg-white" asChild>
                  <Link href={`/connect/${clientId}/folder?demo=1`}>Open demo storage</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
