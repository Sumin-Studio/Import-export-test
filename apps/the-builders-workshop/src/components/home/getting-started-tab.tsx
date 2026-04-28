"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { ChevronDown, ChevronUp, Copy, Check, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { StepTroubleshooting } from "@/components/help/step-troubleshooting";
import { StepCompletionSwitch } from "@/components/help/step-completion-switch";
import { StepDismissChip, StepExpandAffordance } from "@/components/help/step-expand-affordance";
import { StepIndexBadge } from "@/components/help/step-index-badge";
import { getHelpDataForStep } from "@/components/help/getting-started-help-data";
import type { HelpItem } from "@/components/help/getting-started-help-data";
import {
    ADMIN_ACCESS_ROLES,
    getAdminAccessRequestCopy,
    type AdminAccessRole,
} from "@/lib/admin-access-request-copy";
import { cn } from "@/lib/utils";

interface ChecklistStepProps {
    stepNumber: number;
    title: string;
    description?: string | ReactNode;
    expandedContent?: ReactNode;
    copyableContent?: string;
    /** Rendered above the copyable textarea (e.g. role picker for admin request templates). */
    copyableHeader?: ReactNode;
    links?: Array<{ label: string; url: string }>;
    milestoneKey: string;
    completedAt?: string;
    onComplete?: (milestoneKey: string) => void;
    isActionable?: boolean;
    troubleshootingItems?: HelpItem[];
}

function ChecklistStep({
    stepNumber,
    title,
    description,
    expandedContent,
    copyableContent,
    copyableHeader,
    links,
    milestoneKey,
    completedAt,
    onComplete,
    isActionable = true,
    troubleshootingItems,
}: ChecklistStepProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [editableContent, setEditableContent] = useState(copyableContent || "");
    const [isMarking, setIsMarking] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(!!completedAt);
    const [optimisticCompleted, setOptimisticCompleted] = useState<string | undefined>(completedAt);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setEditableContent(copyableContent || "");
    }, [copyableContent]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(editableContent);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleToggleComplete = async () => {
        if (isMarking) return;

        setError(null);
        const wasCompleted = !!optimisticCompleted;
        const optimisticDate = wasCompleted ? undefined : new Date().toISOString();

        // Optimistically update UI immediately
        setOptimisticCompleted(optimisticDate);
        setIsCollapsed(!wasCompleted); // Collapse if marking complete, expand if marking incomplete

        setIsMarking(true);
        try {
            const endpoint = wasCompleted ? "/api/milestones/incomplete" : "/api/milestones/complete";
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ milestoneKey }),
            });

            if (response.ok) {
                onComplete?.(milestoneKey);
            } else {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                console.error("Failed to toggle completion:", response.status, errorData);

                // Revert optimistic update on error
                setOptimisticCompleted(wasCompleted ? completedAt : undefined);
                setIsCollapsed(wasCompleted);
                setError(errorData.error || "Failed to update step. Please try again.");
            }
        } catch (error) {
            console.error("Error toggling completion:", error);

            // Revert optimistic update on error
            setOptimisticCompleted(wasCompleted ? completedAt : undefined);
            setIsCollapsed(wasCompleted);
            setError(`Error updating step: ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setIsMarking(false);
        }
    };

    const formatCompletionDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    // Sync optimistic state with prop changes
    useEffect(() => {
        setOptimisticCompleted(completedAt);
        setIsCollapsed(!!completedAt);
    }, [completedAt]);

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Use optimistic state for display
    const displayCompleted = optimisticCompleted;

    const completedOnTitle = displayCompleted
        ? `Completed on ${formatCompletionDate(displayCompleted)}`
        : undefined;

    const isCollapsedCompleted = !!displayCompleted && isCollapsed;

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col gap-3">
                {/* Badge + title on one items-center row so the title lines up with the number (avoids min-h-11 vs h-8 mismatch) */}
                <div className="flex items-center gap-4">
                    <StepIndexBadge
                        stepNumber={stepNumber}
                        completed={!!displayCompleted}
                        title={completedOnTitle}
                    />
                    <div className="flex min-h-0 min-w-0 flex-1 items-center justify-between gap-3">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                            {isCollapsedCompleted ? (
                                <button
                                    type="button"
                                    onClick={handleToggleCollapse}
                                    className="flex min-w-0 flex-1 items-center gap-2 rounded-lg text-left transition-colors hover:bg-neutral-50 cursor-pointer"
                                >
                                    <h3 className="min-w-0 flex-1 text-lg font-semibold leading-snug text-neutral-900">
                                        {title}
                                    </h3>
                                    <div className="flex min-w-[5.5rem] shrink-0 justify-end">
                                        <StepExpandAffordance isLoading={isMarking} />
                                    </div>
                                </button>
                            ) : (
                                <div className="flex min-w-0 flex-1 items-center gap-2">
                                    <h3 className="min-w-0 flex-1 text-lg font-semibold leading-snug text-neutral-900">
                                        {title}
                                    </h3>
                                    <div className="flex min-w-[5.5rem] shrink-0 justify-end">
                                        {displayCompleted ? (
                                            <StepDismissChip onClick={handleToggleCollapse} />
                                        ) : (
                                            <span className="pointer-events-none opacity-0" aria-hidden>
                                                <StepDismissChip onClick={() => undefined} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {isActionable && (
                            <div className="flex shrink-0">
                                <StepCompletionSwitch
                                    displayCompleted={!!displayCompleted}
                                    isMarking={isMarking}
                                    onToggle={handleToggleComplete}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {!isCollapsedCompleted && (
                    <div className="space-y-3 pl-12">
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                            {error}
                        </div>
                    )}
                    {description && (
                        typeof description === "string" ? (
                            <p className="text-sm text-neutral-600">{description}</p>
                        ) : (
                            <div className="text-sm text-neutral-600">{description}</div>
                        )
                    )}

                    {links && links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-700 underline"
                                >
                                    {link.label}
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            ))}
                        </div>
                    )}

                    {copyableContent && (
                        <div className="space-y-2">
                            {copyableHeader}
                            <textarea
                                value={editableContent}
                                onChange={(e) => setEditableContent(e.target.value)}
                                className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm font-mono text-neutral-700 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
                                rows={copyableContent.split("\n").length + 2}
                                placeholder="Edit the content here, then copy..."
                            />
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 cursor-pointer"
                                >
                                    {isCopied ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            Copy to Clipboard
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {expandedContent && (
                        <div>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                            >
                                {isExpanded ? (
                                    <>
                                        <ChevronUp className="h-4 w-4" />
                                        Show less
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-4 w-4" />
                                        Show more
                                    </>
                                )}
                            </button>
                            {isExpanded && (
                                <div className="mt-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                                    {expandedContent}
                                </div>
                            )}
                        </div>
                    )}

                    {troubleshootingItems && troubleshootingItems.length > 0 && (
                        <StepTroubleshooting items={troubleshootingItems} />
                    )}
                    </div>
                )}
            </div>
        </div>
    );
}

function AdminAccessRolePicker({
    value,
    onChange,
}: {
    value: AdminAccessRole;
    onChange: (role: AdminAccessRole) => void;
}) {
    return (
        <div className="flex flex-wrap items-baseline gap-x-0 gap-y-1 text-sm">
            <span className="mr-2 shrink-0 text-neutral-500">You work in:</span>
            <span className="inline-flex flex-wrap items-center font-medium text-neutral-800">
                {ADMIN_ACCESS_ROLES.map((r, i) => (
                    <span key={r.id} className="inline-flex items-center">
                        {i > 0 && (
                            <span className="select-none px-1 text-neutral-300" aria-hidden>
                                |
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={() => onChange(r.id)}
                            className={cn(
                                "rounded px-1 py-0.5 transition-colors",
                                value === r.id
                                    ? "bg-brand/10 text-brand-800"
                                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                            )}
                        >
                            {r.label.toLowerCase()}
                        </button>
                    </span>
                ))}
            </span>
        </div>
    );
}

interface GettingStartedTabProps {
    onActiveStepChange?: (milestoneKey: string) => void;
    onCompletionsChange?: (completions: Record<string, string>) => void;
}

export function GettingStartedTab({ onActiveStepChange, onCompletionsChange }: GettingStartedTabProps) {
    const [completions, setCompletions] = useState<Record<string, string>>({});
    const [adminAccessRole, setAdminAccessRole] = useState<AdminAccessRole>("design");
    const [isLoading, setIsLoading] = useState(true);
    const previousAllComplete = useRef(false);
    const confettiShown = useRef(false);
    const stepRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        fetchCompletions();
    }, []);

    // IntersectionObserver to detect active step
    useEffect(() => {
        if (isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the most visible entry
                let bestEntry: IntersectionObserverEntry | null = null;
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                            bestEntry = entry;
                        }
                    }
                }
                if (bestEntry) {
                    const key = bestEntry.target.getAttribute("data-milestone-key");
                    if (key) {
                        onActiveStepChange?.(key);
                    }
                }
            },
            { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        stepRefs.current.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [isLoading, onActiveStepChange]);

    const setStepRef = useCallback((milestoneKey: string) => (el: HTMLDivElement | null) => {
        if (el) {
            stepRefs.current.set(milestoneKey, el);
        } else {
            stepRefs.current.delete(milestoneKey);
        }
    }, []);

    const fetchCompletions = async () => {
        try {
            const response = await fetch("/api/milestones/user");
            if (response.ok) {
                const data = await response.json();
                const completionMap: Record<string, string> = {};
                data.completions.forEach((m: { key: string; completed_at?: string }) => {
                    if (m.completed_at) {
                        completionMap[m.key] = m.completed_at;
                    }
                });
                setCompletions(completionMap);
                onCompletionsChange?.(completionMap);
            }
        } catch (error) {
            console.error("Error fetching completions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleComplete = (_milestoneKey: string) => {
        // Refetch to get the actual completion date
        fetchCompletions();
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    useEffect(() => {
        // Check if all milestones are complete whenever completions change
        if (!isLoading) {
            const milestones = [
                "request-admin-access",
                "install-cursor",
                "receiving-admin-access",
                "receiving-cursor-access",
                "setup-code-folder",
                "first-cursor-query"
            ];
            const allComplete = milestones.every(key => completions[key]);

            // Check localStorage to see if confetti was already celebrated
            if (!confettiShown.current) {
                const alreadyCelebrated = localStorage.getItem("confetti-celebrated");
                if (alreadyCelebrated === "true") {
                    confettiShown.current = true;
                    previousAllComplete.current = allComplete;
                }
            }

            // Trigger confetti if:
            // 1. All are now complete
            // 2. They weren't all complete before (state changed to complete)
            // 3. We haven't already celebrated
            if (allComplete && !previousAllComplete.current && !confettiShown.current) {
                triggerConfetti();
                confettiShown.current = true;
                localStorage.setItem("confetti-celebrated", "true");
            }

            // Update the previous state
            previousAllComplete.current = allComplete;
        }
    }, [isLoading, completions]);

    const getHelpItems = (milestoneKey: string) => {
        return getHelpDataForStep(milestoneKey)?.helpItems;
    };

    if (isLoading) {
        return (
            <div className="space-y-8 py-8">
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-semibold text-neutral-900">Welcome to The Builders Workshop</h2>
                    <p className="mt-2 text-base text-neutral-600">
                        We&apos;re teaching designers to build their own apps. Here&apos;s how to get started.
                    </p>
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="text-neutral-600">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 py-8">
            <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold text-neutral-900">Welcome to The Builders Workshop</h2>
                <p className="mt-2 text-base text-neutral-600">
                    We&apos;re teaching designers to build their own apps. Here&apos;s how to get started.
                </p>
            </div>

            <div className="space-y-6">
                <div id="step-install-cursor" data-milestone-key="install-cursor" ref={setStepRef("install-cursor")} className="scroll-mt-24">
                    <ChecklistStep
                        stepNumber={1}
                        title="Get Cursor from Okta"
                        description={
                            <>
                                Start here:{" "}
                                <a
                                    href="https://xero.at.okta.com/next/new?q=Cursor&request_type=68951fc53380949c48127b70"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-neutral-900 underline underline-offset-2 hover:text-neutral-700"
                                >
                                    Request access in Okta
                                </a>
                                . When it&apos;s approved, install the <strong>desktop app</strong> from Company Portal (Windows) or Self Service+ under Developer (Mac). If you only have Cursor open <strong>in the browser</strong> after signing in, use the <strong>bottom-left</strong> profile menu → <strong>Download Cursor</strong> (macOS or Windows) to install the native app—that&apos;s what this program uses. Use the doc below for the full walkthrough.
                            </>
                        }
                        milestoneKey="install-cursor"
                        completedAt={completions["install-cursor"]}
                        onComplete={handleComplete}
                        links={[
                            { label: "Request Cursor in Okta", url: "https://xero.at.okta.com/next/new?q=Cursor&request_type=68951fc53380949c48127b70" },
                            { label: "Cursor at Xero (how to request & install)", url: "https://xero.atlassian.net/wiki/spaces/AIHUB/pages/271144322016" }
                        ]}
                        troubleshootingItems={getHelpItems("install-cursor")}
                    />
                </div>

                <div id="step-receiving-cursor-access" data-milestone-key="receiving-cursor-access" ref={setStepRef("receiving-cursor-access")} className="scroll-mt-24">
                    <ChecklistStep
                        stepNumber={2}
                        title="Open Cursor"
                        description={
                            <>
                                When your request is approved, you&apos;ll be notified in Slack via the Okta app. Install the <strong>desktop app</strong> from Company Portal (Windows, search &quot;Cursor&quot;) or Self Service+ on Mac (Developer)—that gives you a real local IDE (files + terminal), which is what we need here.
                                {" "}
                                <strong>If you only see Cursor in the browser</strong> (web / Agent experience): open the menu at the <strong>bottom-left</strong> (your profile or initials), then choose <strong>Download Cursor</strong> (e.g. &quot;Download Cursor macOS&quot; or the Windows installer), install it, and launch the <strong>desktop</strong> app from Applications or Start.
                                {" "}
                                Opening Cursor from the Okta tile may still land on the Agent dashboard first—that&apos;s OK; switch to the full IDE from there once you&apos;re in the desktop app.
                            </>
                        }
                        milestoneKey="receiving-cursor-access"
                        completedAt={completions["receiving-cursor-access"]}
                        onComplete={handleComplete}
                        troubleshootingItems={getHelpItems("receiving-cursor-access")}
                    />
                </div>

                <div id="step-setup-code-folder" data-milestone-key="setup-code-folder" ref={setStepRef("setup-code-folder")} className="scroll-mt-24">
                    <ChecklistStep
                        stepNumber={3}
                        title="Set Up Your Code Folder"
                        milestoneKey="setup-code-folder"
                        completedAt={completions["setup-code-folder"]}
                        onComplete={handleComplete}
                        description={
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Make a new folder in your home directory called <code className="bg-neutral-200 px-1 rounded">code</code></li>
                                <li>Open Cursor—it&apos;ll ask you to open a directory. Pick the <code className="bg-neutral-200 px-1 rounded">code</code> folder you just made.</li>
                            </ul>
                        }
                        troubleshootingItems={getHelpItems("setup-code-folder")}
                    />
                </div>

                <div id="step-first-cursor-query" data-milestone-key="first-cursor-query" ref={setStepRef("first-cursor-query")} className="scroll-mt-24">
                    <ChecklistStep
                        stepNumber={4}
                        title="Put Your First Query Into Cursor"
                        description="Copy this into the Cursor chat and let it do its thing. This setup only assumes you have Cursor access at Xero."
                        milestoneKey="first-cursor-query"
                        completedAt={completions["first-cursor-query"]}
                        onComplete={handleComplete}
                        copyableContent={`You are my onboarding assistant for Xero.

I already have Cursor access. Do not install Homebrew, Bun, Node, or any global tools.

Please do the following inside this current project folder:

1. Create a file named first-builders-checkin.md
2. Add:
   - A heading: "Builders Workshop: Setup Check"
   - Today's date
   - A short checklist with:
     - "Cursor access confirmed"
     - "Workspace opened"
     - "Ready for first build"
3. Create a simple index.html page with a clean welcome message that says:
   - "I am set up in Cursor at Xero."
   - "Ready to build."
4. Tell me exactly how to open index.html in my browser.

When done, print exactly:
"Ok! Cursor is set up and you're ready to build."`}
                        troubleshootingItems={getHelpItems("first-cursor-query")}
                    />
                </div>

                <div id="step-request-admin-access" data-milestone-key="request-admin-access" ref={setStepRef("request-admin-access")} className="scroll-mt-24">
                    <ChecklistStep
                        stepNumber={5}
                        title="Optional: Request Admin Access"
                        description="Only do this if a tool install or permission issue blocks you. Most people can start with Cursor access only."
                        milestoneKey="request-admin-access"
                        completedAt={completions["request-admin-access"]}
                        onComplete={handleComplete}
                        links={[
                            { label: "Request form", url: "https://xero.atlassian.net/servicedesk/customer/portal/1009/group/1601/create/1078" }
                        ]}
                        copyableHeader={
                            <AdminAccessRolePicker value={adminAccessRole} onChange={setAdminAccessRole} />
                        }
                        copyableContent={getAdminAccessRequestCopy(adminAccessRole)}
                        troubleshootingItems={getHelpItems("request-admin-access")}
                    />
                </div>

                <div id="step-receiving-admin-access" data-milestone-key="receiving-admin-access" ref={setStepRef("receiving-admin-access")} className="scroll-mt-24">
                    <ChecklistStep
                        stepNumber={6}
                        title="Optional: Receive Admin Access"
                        description="If you submitted an admin request, this can take anywhere from a few hours to a few days or weeks. If not, you can skip this."
                        milestoneKey="receiving-admin-access"
                        completedAt={completions["receiving-admin-access"]}
                        onComplete={handleComplete}
                        troubleshootingItems={getHelpItems("receiving-admin-access")}
                    />
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-3">
                            <h3 className="text-lg font-semibold text-neutral-900">Stay tuned!</h3>
                            <p className="text-sm text-neutral-600">
                                That&apos;s it for now. We&apos;re building out the curriculum and will have more for you soon. In the meantime, jump into the Slack channel to ask questions, share wins, or just say hi.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <a
                                    href="https://xero.enterprise.slack.com/archives/C09PVD53RC7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-700 underline"
                                >
                                    #builders-workshop
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
