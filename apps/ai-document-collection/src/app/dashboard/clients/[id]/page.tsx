"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getClientById } from "@/data/clients";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Bot, ExternalLink, FileText, FolderOpen, Link2, Loader2, Mail, Play, Settings2, Unplug } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClassifiedFile } from "@/lib/store";
import type { Engagement, ExpectedItemInstance } from "@/lib/engagements";
import type { ExpectedItemTemplate } from "@/lib/engagement-templates";

const CHASE_AGENT_SETTINGS_KEY = (clientId: string) => `chase-agent-settings-${clientId}`;

type ChaseAgentSettings = {
  channel: string;
  firstOutreach: string;
  cadence: string;
  stopWhen: string;
};

const DEFAULT_CHASE_AGENT_SETTINGS: ChaseAgentSettings = {
  channel: "email-client",
  firstOutreach: "24h",
  cadence: "3bd",
  stopWhen: "all-received",
};

function loadChaseAgentSettings(clientId: string): ChaseAgentSettings {
  if (typeof window === "undefined") return { ...DEFAULT_CHASE_AGENT_SETTINGS };
  try {
    const raw = localStorage.getItem(CHASE_AGENT_SETTINGS_KEY(clientId));
    if (!raw) return { ...DEFAULT_CHASE_AGENT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<ChaseAgentSettings>;
    return normalizeChaseAgentSettings(parsed);
  } catch {
    return { ...DEFAULT_CHASE_AGENT_SETTINGS };
  }
}

function persistChaseAgentSettings(clientId: string, s: ChaseAgentSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHASE_AGENT_SETTINGS_KEY(clientId), JSON.stringify(s));
  } catch {
    // ignore quota / private mode
  }
}

const CHASE_CHANNEL_OPTIONS: { value: string; label: string }[] = [
  { value: "email-client", label: "Email to client" },
  { value: "email-cc-you", label: "Email to client (CC you)" },
  { value: "sms-demo", label: "SMS (demo — not connected)" },
];

const CHASE_FIRST_OPTIONS: { value: string; label: string }[] = [
  { value: "immediate", label: "Immediately" },
  { value: "24h", label: "Within 24 hours" },
  { value: "48h", label: "Within 48 hours" },
  { value: "1w", label: "Within 1 week" },
];

const CHASE_CADENCE_OPTIONS: { value: string; label: string }[] = [
  { value: "2bd", label: "Every 2 business days" },
  { value: "3bd", label: "Every 3 business days" },
  { value: "5bd", label: "Every 5 business days" },
  { value: "1w", label: "Every week" },
  { value: "2w", label: "Every 2 weeks" },
];

const CHASE_STOP_OPTIONS: { value: string; label: string }[] = [
  { value: "all-received", label: "All required docs are received" },
  { value: "all-received-waived", label: "All docs received or waived" },
  { value: "manual", label: "Until I pause the agent" },
];

function normalizeChaseAgentSettings(p: Partial<ChaseAgentSettings>): ChaseAgentSettings {
  const out = { ...DEFAULT_CHASE_AGENT_SETTINGS };
  if (p.channel && CHASE_CHANNEL_OPTIONS.some((o) => o.value === p.channel)) out.channel = p.channel;
  if (p.firstOutreach && CHASE_FIRST_OPTIONS.some((o) => o.value === p.firstOutreach))
    out.firstOutreach = p.firstOutreach;
  if (p.cadence && CHASE_CADENCE_OPTIONS.some((o) => o.value === p.cadence)) out.cadence = p.cadence;
  if (p.stopWhen && CHASE_STOP_OPTIONS.some((o) => o.value === p.stopWhen)) out.stopWhen = p.stopWhen;
  return out;
}

const selectClass =
  "w-full max-w-[220px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LINE_DELAY_MS = 70;

const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg"]);
function isImageFileName(name: string): boolean {
  const ext = name.split(".").pop()?.toLowerCase();
  return !!ext && IMAGE_EXTENSIONS.has(ext);
}

function LiveAgentFeed({ messages }: { messages: string[] }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const isComplete = visibleCount >= messages.length;

  // Reveal one line at a time: smooth, like reasoning steps appearing
  useEffect(() => {
    if (visibleCount >= messages.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), LINE_DELAY_MS);
    return () => clearTimeout(t);
  }, [visibleCount, messages.length]);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-sm">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full bg-slate-400",
            !isComplete && "animate-pulse"
          )}
        />
        <span className="text-xs font-medium tracking-wide text-slate-500">
          {isComplete ? "Done" : "Thinking…"}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {messages.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-slate-600 animate-in fade-in duration-200"
          >
            <span className="mt-0.5 shrink-0 text-slate-400">›</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function groupFilesByCategory(files: ClassifiedFile[]): { category: string; files: ClassifiedFile[] }[] {
  const groups = new Map<string, ClassifiedFile[]>();
  const order = ["Tax Documents", "Payroll", "Receipts", "Invoices", "Bank Statements", "Other"];
  for (const cat of order) groups.set(cat, []);
  for (const f of files) {
    const list = groups.get(f.category) ?? groups.get("Other")!;
    list.push(f);
  }
  return order.map((category) => ({
    category,
    files: groups.get(category)!,
  })).filter((g) => g.files.length > 0);
}

export default function ClientDetailPage() {
  const params = useParams();
  const client = getClientById(params.id as string);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [scanResult, setScanResult] = useState<{
    log: string[];
    files: ClassifiedFile[];
    lastSeenPaths?: string[];
  } | null>(null);
  const [scanning, setScanning] = useState(false);
  const [hasNewFiles, setHasNewFiles] = useState(false);
  const [pollingInitialScan, setPollingInitialScan] = useState(false);
  const [engagementData, setEngagementData] = useState<{
    engagement: Engagement | null;
    expectedItems: ExpectedItemInstance[];
    templates: ExpectedItemTemplate[];
    chasePlanStatus: string | null;
  } | null>(null);
  const [chaseModalOpen, setChaseModalOpen] = useState(false);
  const [chaseDraft, setChaseDraft] = useState<{
    subject: string;
    body: string;
    items: { id: string; templateId: string; label: string }[];
  } | null>(null);
  const [chaseLoading, setChaseLoading] = useState(false);
  const [chaseError, setChaseError] = useState<string | null>(null);
  const [chaseAgentSettings, setChaseAgentSettings] = useState<ChaseAgentSettings>(
    () => ({ ...DEFAULT_CHASE_AGENT_SETTINGS })
  );

  const updateChaseAgentSetting = useCallback(
    <K extends keyof ChaseAgentSettings>(key: K, value: ChaseAgentSettings[K]) => {
      setChaseAgentSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const closeChaseModal = useCallback(() => {
    setChaseModalOpen(false);
    setChaseError(null);
  }, []);

  const handleChaseModalSave = useCallback(() => {
    if (client) persistChaseAgentSettings(client.id, chaseAgentSettings);
    closeChaseModal();
  }, [client, chaseAgentSettings, closeChaseModal]);

  useEffect(() => {
    if (chaseModalOpen && client) {
      setChaseAgentSettings(loadChaseAgentSettings(client.id));
    }
  }, [chaseModalOpen, client?.id]);

  useEffect(() => {
    if (!client) return;
    fetch("/api/clients/status")
      .then((r) => r.json())
      .then((status: Record<string, { connected: boolean }>) => {
        setConnected(!!status[client.id]?.connected);
      })
      .catch(() => setConnected(false));
  }, [client?.id]);

  const fetchEngagement = useCallback(() => {
    if (!client) return;
    fetch(`/api/clients/${client.id}/engagement`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { engagement: Engagement | null; expectedItems: ExpectedItemInstance[]; templates: ExpectedItemTemplate[]; chasePlanStatus?: string | null } | null) => {
        if (data) setEngagementData({ engagement: data.engagement, expectedItems: data.expectedItems ?? [], templates: data.templates ?? [], chasePlanStatus: data.chasePlanStatus ?? null });
      })
      .catch(() => {});
  }, [client?.id]);

  useEffect(() => {
    if (!client) return;
    fetch(`/api/clients/${client.id}/scan`, { method: "GET" }).then((r) => {
      if (r.ok)
        r.json().then((data: { log?: string[]; files?: ClassifiedFile[]; lastSeenPaths?: string[] }) => {
          if ((data.files?.length ?? 0) > 0 || (data.log?.length ?? 0) > 0) {
            setScanResult({
              log: data.log ?? [],
              files: data.files ?? [],
              lastSeenPaths: data.lastSeenPaths,
            });
          }
        });
    });
  }, [client?.id]);

  useEffect(() => {
    if (!client) return;
    fetchEngagement();
  }, [client?.id, fetchEngagement]);

  // When client is connected but we have no scan result yet, poll for the initial scan (triggered on connect)
  useEffect(() => {
    if (!client || !connected || scanResult !== null || scanning) return;
    setPollingInitialScan(true);
    const pollMs = 2_000;
    const timeoutMs = 90_000;
    const start = Date.now();
    const id = setInterval(() => {
      if (Date.now() - start > timeoutMs) {
        clearInterval(id);
        setPollingInitialScan(false);
        return;
      }
      fetch(`/api/clients/${client.id}/scan`, { method: "GET" })
        .then((r) => (r.ok ? r.json() : null))
        .then((data: { log?: string[]; files?: ClassifiedFile[]; lastSeenPaths?: string[] } | null) => {
          if (!data) return;
          if ((data.files?.length ?? 0) > 0 || (data.log?.length ?? 0) > 0) {
            setScanResult({
              log: data.log ?? [],
              files: data.files ?? [],
              lastSeenPaths: data.lastSeenPaths,
            });
            setPollingInitialScan(false);
          }
        })
        .catch(() => {});
    }, pollMs);
    return () => {
      clearInterval(id);
      setPollingInitialScan(false);
    };
  }, [client?.id, connected, scanResult, scanning]);

  // Poll Dropbox folder for new/removed files when connected and we have a previous scan to compare
  useEffect(() => {
    if (!client || !connected || scanning) return;
    const hasPreviousScan =
      scanResult &&
      ((scanResult.lastSeenPaths?.length ?? 0) > 0 || (scanResult.files?.length ?? 0) > 0);
    if (!hasPreviousScan) return;
    const normalize = (p: string) => p.replace(/^\/+/, "") || "/";
    const lastPaths = new Set(
      (scanResult.lastSeenPaths ?? scanResult.files?.map((f) => f.path_display) ?? []
      ).map(normalize)
    );
    const intervalMs = 60_000; // 60 seconds
    const check = () => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
      fetch(`/api/clients/${client.id}/folder-files`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data: { paths?: string[] } | null) => {
          if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
          if (!data?.paths) return;
          const currentPaths = new Set(data.paths.map(normalize));
          // Only show banner when there are new files (in folder but not in last scan), not when files were only removed
          const hasNew = Array.from(currentPaths).some((p) => !lastPaths.has(p));
          if (hasNew) setHasNewFiles(true);
        })
        .catch(() => {});
    };
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [client?.id, connected, scanning, scanResult]);

  const handleRunScan = async () => {
    if (!client) return;
    setScanning(true);
    setScanResult(null);
    setHasNewFiles(false);
    try {
      const res = await fetch(`/api/clients/${client.id}/scan`, {
        method: "POST",
      });
      const data = await res.json() as { log?: string[]; files?: ClassifiedFile[]; lastSeenPaths?: string[] };
      if (data.log && data.files) setScanResult({ log: data.log, files: data.files, lastSeenPaths: data.lastSeenPaths });
      else setScanResult({ log: data.log || ["Scan failed."], files: [], lastSeenPaths: data.lastSeenPaths });
      fetchEngagement();
    } catch {
      setScanResult({ log: ["Scan request failed."], files: [] });
    } finally {
      setScanning(false);
    }
  };

  const handleDisconnect = async () => {
    if (!client) return;
    try {
      const res = await fetch(`/api/clients/${client.id}/disconnect`, {
        method: "POST",
      });
      if (res.ok) {
        setConnected(false);
        setScanResult(null);
        setEngagementData(null);
        setHasNewFiles(false);
        setPollingInitialScan(false);
      }
    } catch {
      // ignore
    }
  };

  const handleSetUpChasingAgent = async () => {
    if (!client || !engagementData?.engagement) return;
    setChaseLoading(true);
    setChaseError(null);
    try {
      const res = await fetch(`/api/clients/${client.id}/chase/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engagementId: engagementData.engagement.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setChaseError(data.error ?? "Failed to set up chasing agent");
        return;
      }
      setChaseDraft({
        subject: data.subject ?? "",
        body: data.body ?? "",
        items: data.items ?? [],
      });
      setChaseModalOpen(true);
      fetchEngagement();
    } catch {
      setChaseError("Request failed");
    } finally {
      setChaseLoading(false);
    }
  };

  const handleCopyChaseToClipboard = () => {
    if (!chaseDraft) return;
    const text = `Subject: ${chaseDraft.subject}\n\n${chaseDraft.body}`;
    void navigator.clipboard.writeText(text);
  };

  const chasingAgentActive =
    engagementData?.chasePlanStatus === "SENT" || engagementData?.chasePlanStatus === "RESOLVED";

  const handleShowAgentSettings = async () => {
    if (chaseDraft) {
      setChaseModalOpen(true);
      return;
    }
    await handleSetUpChasingAgent();
  };

  if (!client) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Client not found.</p>
        <Button variant="link" asChild className="mt-2">
          <Link href="/dashboard/clients">Back to clients</Link>
        </Button>
      </div>
    );
  }

  const [documentViewFile, setDocumentViewFile] = useState<ClassifiedFile | null>(null);
  const [confidencePopoverPath, setConfidencePopoverPath] = useState<string | null>(null);
  const [lowConfidenceThreshold, setLowConfidenceThreshold] = useState(80);
  const confidencePopoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/settings/agent-config")
      .then((r) => r.json())
      .then((data: { lowConfidenceThreshold?: number }) =>
        setLowConfidenceThreshold(typeof data.lowConfidenceThreshold === "number" ? data.lowConfidenceThreshold : 80)
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!confidencePopoverPath) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (confidencePopoverRef.current?.contains(e.target as Node)) return;
      setConfidencePopoverPath(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [confidencePopoverPath]);

  const showConnectPrompt = connected === false;
  const showScanUI = connected === true;

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/clients">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {client.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Dropbox • Live agent activity
            </p>
          </div>
        </div>
        {showScanUI && (
          <div className="flex gap-2">
            <Button onClick={handleRunScan} disabled={scanning}>
              {scanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning…
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run agent scan
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleDisconnect} title="Disconnect (for testing)">
              <Unplug className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>
        )}
      </div>

      {showConnectPrompt && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-6 text-center">
          <p className="font-medium text-slate-900">
            This client has not connected yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Send them an onboarding request from the dashboard to get the link. They will open it, connect their storage, and choose which folder the agent can scan. Once connected, the agent will scan for relevant files and they will appear here.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/clients">Back to clients</Link>
          </Button>
        </div>
      )}

      {showScanUI && hasNewFiles && (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3">
          <p className="text-sm font-medium text-blue-900">
            New or changed files detected in Dropbox. Run a scan to update the list.
          </p>
          <Button size="sm" onClick={handleRunScan} disabled={scanning}>
            {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run scan"}
          </Button>
        </div>
      )}

      {showScanUI && (
        <>
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Live Agent Activity
            </h2>
            {scanResult ? (
              <LiveAgentFeed messages={scanResult.log} />
            ) : scanning ? (
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-4 font-mono text-sm text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                Running scan…
              </div>
            ) : pollingInitialScan ? (
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-4 font-mono text-sm text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                Initial scan in progress… (started when the client connected)
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 text-sm text-muted-foreground">
                Click &quot;Run agent scan&quot; to list and classify files from your Dropbox folder.
              </div>
            )}
          </section>

          {engagementData && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Document readiness
              </h2>
              {engagementData.engagement ? (
                <>
                  <p className="mb-3 text-sm text-slate-700">
                    Docs completeness: {engagementData.engagement.completenessPercent}%
                    {engagementData.engagement.missingItemCount > 0
                      ? ` – ${engagementData.engagement.missingItemCount} item${engagementData.engagement.missingItemCount !== 1 ? "s" : ""} missing.`
                      : " – All required docs received."}
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Matched files count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {engagementData.expectedItems.map((ei) => {
                          const template = engagementData.templates.find((t) => t.id === ei.templateId);
                          const label = template?.label ?? ei.templateId;
                          const statusVariant =
                            ei.status === "RECEIVED"
                              ? "success"
                              : ei.status === "WAIVED"
                                ? "outline"
                                : "secondary";
                          return (
                            <TableRow key={ei.id}>
                              <TableCell className="font-medium">{label}</TableCell>
                              <TableCell>
                                <Badge variant={statusVariant}>
                                  {ei.status === "NOT_RECEIVED"
                                    ? "Not received"
                                    : ei.status === "RECEIVED"
                                      ? "Received"
                                      : "Waived"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {ei.matchedFilePaths.length}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {engagementData.chasePlanStatus && engagementData.chasePlanStatus !== "NONE" && (
                      <Badge
                        variant={engagementData.chasePlanStatus === "RESOLVED" ? "success" : "secondary"}
                      >
                        {engagementData.chasePlanStatus === "RESOLVED"
                          ? "Chase resolved"
                          : "Chasing agent active"}
                      </Badge>
                    )}
                    {engagementData.chasePlanStatus === "NONE" && (
                      <span className="text-sm text-muted-foreground">Chasing agent not set up</span>
                    )}
                  </div>
                  {engagementData.engagement.missingItemCount > 0 ? (
                    <div className="mt-3 space-y-2">
                      <Button
                        variant={chasingAgentActive ? "secondary" : "default"}
                        onClick={
                          chasingAgentActive ? handleShowAgentSettings : handleSetUpChasingAgent
                        }
                        disabled={chaseLoading || engagementData.chasePlanStatus === "RESOLVED"}
                      >
                        {chaseLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : chasingAgentActive ? (
                          <Settings2 className="mr-2 h-4 w-4" />
                        ) : (
                          <Mail className="mr-2 h-4 w-4" />
                        )}
                        {chasingAgentActive ? "Show agent settings" : "Set up chasing agent"}
                      </Button>
                      {chaseError && (
                        <p className="text-sm text-destructive">{chaseError}</p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                      All required docs received.
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Run a scan to see required documents and completeness.
                </p>
              )}
            </section>
          )}

          <Dialog open={chaseModalOpen} onOpenChange={(open) => !open && closeChaseModal()}>
            <DialogContent
              className="max-w-2xl gap-0 overflow-hidden p-0"
              showClose={true}
              onPointerDownOutside={closeChaseModal}
            >
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <DialogHeader className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <Bot className="h-5 w-5" aria-hidden />
                    </div>
                    <DialogTitle className="text-lg">Chasing agent</DialogTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This agent runs on its own: it emails the client about missing documents and follows up until everything is in—or you turn it off. Nothing here needs to be copied or pasted into your inbox.
                  </p>
                </DialogHeader>
              </div>
              <div className="max-h-[min(70vh,32rem)] space-y-5 overflow-y-auto px-6 py-5">
                {chaseError && (
                  <p className="text-sm text-destructive">{chaseError}</p>
                )}
                {chaseDraft && (
                  <>
                    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        How the agent behaves
                      </h3>
                      <div className="mt-3 space-y-3 text-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-muted-foreground">Status</span>
                          <span className="font-medium text-emerald-700">Active · monitoring this engagement</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label htmlFor="chase-channel" className="text-muted-foreground">
                            Channel
                          </label>
                          <select
                            id="chase-channel"
                            className={selectClass}
                            value={chaseAgentSettings.channel}
                            onChange={(e) => updateChaseAgentSetting("channel", e.target.value)}
                          >
                            {CHASE_CHANNEL_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label htmlFor="chase-first" className="text-muted-foreground">
                            First outreach
                          </label>
                          <select
                            id="chase-first"
                            className={selectClass}
                            value={chaseAgentSettings.firstOutreach}
                            onChange={(e) => updateChaseAgentSetting("firstOutreach", e.target.value)}
                          >
                            {CHASE_FIRST_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label htmlFor="chase-cadence" className="text-muted-foreground">
                            Follow-up cadence
                          </label>
                          <select
                            id="chase-cadence"
                            className={selectClass}
                            value={chaseAgentSettings.cadence}
                            onChange={(e) => updateChaseAgentSetting("cadence", e.target.value)}
                          >
                            {CHASE_CADENCE_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label htmlFor="chase-stop" className="text-muted-foreground">
                            Stops automatically when
                          </label>
                          <select
                            id="chase-stop"
                            className={cn(selectClass, "max-w-[260px]")}
                            value={chaseAgentSettings.stopWhen}
                            onChange={(e) => updateChaseAgentSetting("stopWhen", e.target.value)}
                          >
                            {CHASE_STOP_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-muted-foreground">
                        Demo: scheduling and sends are simulated. In a live product this would connect to your practice email or messaging.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Items the agent is chasing
                      </h3>
                      <ul className="rounded-md border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-700">
                        {chaseDraft.items.map((item) => (
                          <li key={item.id} className="flex items-center gap-2 py-1">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email template the agent uses
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        The agent fills in names and links automatically. You can tweak wording below; the next automated send will use this version.
                      </p>
                      <label className="text-sm font-medium text-slate-800">Subject line</label>
                      <textarea
                        className="w-full min-h-[2.5rem] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                        value={chaseDraft.subject}
                        onChange={(e) =>
                          setChaseDraft((d) => (d ? { ...d, subject: e.target.value } : null))
                        }
                        rows={1}
                      />
                      <label className="text-sm font-medium text-slate-800">Message body</label>
                      <textarea
                        className="w-full min-h-[10rem] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed"
                        value={chaseDraft.body}
                        onChange={(e) =>
                          setChaseDraft((d) => (d ? { ...d, body: e.target.value } : null))
                        }
                        rows={9}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/80 px-6 py-4">
                <button
                  type="button"
                  onClick={handleCopyChaseToClipboard}
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-slate-700 hover:underline"
                >
                  Copy template (optional, for your records)
                </button>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeChaseModal} className="min-w-[5.5rem]">
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleChaseModalSave} className="min-w-[5.5rem]">
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {scanResult && scanResult.files.length > 0 && (
            <section>
              <div className="mb-3 flex flex-col gap-1">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Categorized files
                </h2>
                <p className="text-xs text-muted-foreground">
                  Each file is classified by the AI and <strong>auto-linked to a Xero-style transaction or job</strong> (invoice, bill, bank txn, job) so you can see how it would be consumed in Xero.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {groupFilesByCategory(scanResult.files).map(({ category, files }) => (
                  <div
                    key={category}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2 font-medium text-slate-900">
                      <FolderOpen className="h-4 w-4 text-slate-500" />
                      {category}
                    </div>
                    <ul className="space-y-2">
                      {files.map((file) => (
                        <li
                          key={file.path_display}
                          className="flex min-w-0 flex-col gap-1.5 rounded-md border border-slate-100 bg-slate-50/50 px-3 py-2"
                          title={file.path_display !== file.name ? file.path_display : undefined}
                        >
                          <div className="flex min-w-0 items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                              <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                              <span className="truncate text-sm">{file.name}</span>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1.5 text-xs text-slate-600 hover:text-slate-900"
                              onClick={() => setDocumentViewFile(file)}
                              title="View document"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              View
                            </Button>
                            <div className="relative" ref={confidencePopoverPath === file.path_display ? confidencePopoverRef : undefined}>
                              <button
                                type="button"
                                onClick={() => setConfidencePopoverPath((p) => (p === file.path_display ? null : file.path_display))}
                                className="focus:outline-none"
                              >
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    "cursor-pointer text-xs transition-opacity hover:opacity-90",
                                    file.confidence < lowConfidenceThreshold && "border-amber-300 bg-amber-50 text-amber-800"
                                  )}
                                  title={file.reason ?? "Click for confidence details"}
                                >
                                  {file.confidence}%
                                </Badge>
                              </button>
                              {confidencePopoverPath === file.path_display && (
                                <div className="absolute right-0 top-full z-50 mt-1.5 w-64 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
                                  <p className="text-xs font-medium text-slate-700">Confidence: {file.confidence}%</p>
                                  {file.reason && (
                                    <p className="mt-1.5 text-xs text-slate-600">
                                      {file.reason}
                                    </p>
                                  )}
                                  {file.confidence < lowConfidenceThreshold && !file.reason && (
                                    <p className="mt-1.5 text-xs text-slate-600">
                                      {file.lowConfidenceReason ?? "Document type was not clearly identifiable from the filename or content."}
                                    </p>
                                  )}
                                  {file.confidence >= lowConfidenceThreshold && !file.reason && !file.lowConfidenceReason && (
                                    <p className="mt-1.5 text-xs text-slate-500">Classification is confident.</p>
                                  )}
                                </div>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs" title={file.reason}>
                              {file.category}
                            </Badge>
                            </div>
                          </div>
                          {file.linkedTo && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Link2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                              <span>
                                Linked to{" "}
                                <button
                                  type="button"
                                  className="font-medium text-slate-700 underline-offset-2 hover:underline hover:text-primary cursor-pointer"
                                  title="View in Xero (demo)"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {file.linkedTo.label}
                                </button>
                              </span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <Dialog open={!!documentViewFile} onOpenChange={(open) => !open && setDocumentViewFile(null)}>
        <DialogContent
          className="max-h-[90vh] max-w-5xl gap-0 p-0"
          showClose={true}
          onPointerDownOutside={() => setDocumentViewFile(null)}
        >
          {documentViewFile && client && (
            <>
              <DialogHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-200 px-4 py-3">
                <DialogTitle className="truncate text-base font-medium">
                  {documentViewFile.name}
                </DialogTitle>
              </DialogHeader>
              <div className="flex min-h-[70vh] flex-col bg-slate-100">
                {isImageFileName(documentViewFile.name) ? (
                  <div className="flex min-h-[70vh] w-full flex-1 items-center justify-center p-4">
                    <img
                      src={`/api/clients/${client.id}/file?path=${encodeURIComponent(documentViewFile.path_display)}`}
                      alt={documentViewFile.name}
                      className="max-h-[70vh] max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <iframe
                    title={documentViewFile.name}
                    src={`/api/clients/${client.id}/file?path=${encodeURIComponent(documentViewFile.path_display)}`}
                    className="h-[70vh] w-full flex-1 border-0"
                  />
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
