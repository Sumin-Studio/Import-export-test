"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { clients } from "@/data/clients";
import type { Client } from "@/data/clients";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function getClientConnectLink(clientId: string): string {
  if (typeof window === "undefined") return "";
  const base = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  return `${base}/connect/${clientId}`;
}

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedClient?: Client | null;
}

type Step = "select" | "link";

export function OnboardingModal({
  open,
  onOpenChange,
  preselectedClient = null,
}: OnboardingModalProps) {
  const [step, setStep] = useState<Step>("select");
  const [selectedClient, setSelectedClient] = useState<Client | null>(
    preselectedClient
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(preselectedClient ? "link" : "select");
      setSelectedClient(preselectedClient);
      setCopied(false);
    }
  }, [open, preselectedClient]);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setStep("link");
    setCopied(false);
  };

  const handleCopyLink = async () => {
    if (!selectedClient) return;
    const link = getClientConnectLink(selectedClient.id);
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = () => {
    if (step === "link") setStep("select");
    else onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showClose={true}
        className="max-w-[calc(100vw-2rem)] overflow-hidden sm:max-w-md"
        onPointerDownOutside={(e) => step === "link" && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {step === "select" ? "Send onboarding request" : "Link for your client"}
          </DialogTitle>
          <DialogDescription>
            {step === "select"
              ? "Choose a client to generate a secure link. Send the link to your client by email; they will open it, connect their storage, and choose which folder the agent can scan."
              : "Send this link to your client by email. They will see an email-style page, then choose their cloud storage (Dropbox is available) and pick which folder the agent can scan. This request is linked to your Xero practice."}
          </DialogDescription>
        </DialogHeader>

        {step === "select" && (
          <div className="grid gap-2 py-2">
            <p className="text-sm font-medium text-slate-700">Select client</p>
            <ul className="max-h-48 space-y-1 overflow-y-auto rounded-md border border-slate-200 bg-slate-50/50 p-2">
              {clients.map((client) => (
                <li key={client.id}>
                  <button
                    type="button"
                    onClick={() => handleClientSelect(client)}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                      "hover:bg-slate-100 focus:bg-slate-100 focus:outline-none",
                      selectedClient?.id === client.id && "bg-primary/10 text-primary"
                    )}
                  >
                    <span className="font-medium">{client.name}</span>
                    <span className="ml-2 text-muted-foreground">
                      {client.email}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === "link" && selectedClient && (
          <div className="min-w-0 space-y-3 py-2">
            <p className="text-sm font-medium text-slate-700">
              Client: {selectedClient.name}
            </p>
            <p className="text-xs text-muted-foreground">
              Copy this link and paste it into an email to {selectedClient.email}:
            </p>
            <div className="flex w-full min-w-0 max-w-full gap-2">
              <code className="block min-w-0 flex-1 truncate rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs text-slate-700">
                {getClientConnectLink(selectedClient.id)}
              </code>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={handleCopyLink}
                title="Copy link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleBack}>
            {step === "link" ? "Back" : "Cancel"}
          </Button>
          {step === "link" && (
            <Button onClick={handleCopyLink}>
              {copied ? "Copied!" : "Copy link"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
