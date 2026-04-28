import Link from "next/link";
import { getClientById } from "@/data/clients";
import { Button } from "@/components/ui/button";

export default async function ConnectClientEmailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClientById(clientId);

  if (!client) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-8">
        <p className="text-slate-600">This link is invalid or has expired.</p>
      </div>
    );
  }

  const storageUrl = `/connect/${clientId}/storage`;

  return (
    <div className="min-h-screen bg-slate-200 py-8 px-4 sm:px-6">
      {/* Email-style container: inbox look */}
      <div className="mx-auto max-w-2xl">
        {/* Fake email client chrome */}
        <div className="rounded-t-lg border border-b-0 border-slate-300 bg-slate-100 px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>← Back</span>
            <span className="text-slate-400">|</span>
            <span>Archive</span>
            <span>Report spam</span>
          </div>
        </div>

        <div className="rounded-b-lg border border-t-0 border-slate-300 bg-white p-0 shadow-md">
          {/* Email header */}
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-semibold text-amber-700">
                  {client.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">
                    {client.name} <span className="font-normal text-slate-500">via AgenticCloud by Xero</span>
                  </p>
                  <p className="truncate text-sm text-slate-500">to {client.email}</p>
                </div>
              </div>
              <p className="shrink-0 text-right text-xs text-slate-400">Now</p>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              Your secure Tax Link is ready
            </h2>
          </div>

          {/* Email body */}
          <div className="px-6 py-6 text-slate-700">
            <p className="mb-4">
              Hi,
            </p>
            <p className="mb-4">
              We’re moving away from the back-and-forth of document requests. I’ve set up a secure <strong>Tax Link</strong> for your business using <strong>AgenticCloud by Xero</strong>.
            </p>
            <p className="mb-4">
              Instead of you finding and emailing me files, our system will automatically spot tax-relevant documents in your Dropbox (or Google Drive when available) and pull them into our secure tax workpaper folder. You don’t have to do anything.
            </p>
            <p className="mb-4">
              Click the button below to connect your storage and choose which folder we can access. You stay in control and can revoke access anytime.
            </p>
            <p className="mb-6">
              If you didn’t expect this, you can ignore this message.
            </p>
            <p>
              Thanks,
              <br />
              <strong>The AgenticCloud team at Xero</strong>
            </p>
          </div>

          {/* CTA - single button like in an email */}
          <div className="border-t border-slate-200 px-6 py-6">
            <Button className="w-full sm:w-auto min-w-[200px]" size="lg" asChild>
              <Link href={storageUrl}>
                Connect my storage
              </Link>
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          This link was sent by your accountant. Secure connection.
        </p>
      </div>
    </div>
  );
}
