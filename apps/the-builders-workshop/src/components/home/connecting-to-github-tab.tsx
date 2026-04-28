"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { StepTroubleshooting } from "@/components/help/step-troubleshooting";
import { StepCompletionSwitch } from "@/components/help/step-completion-switch";
import { StepDismissChip, StepExpandAffordance } from "@/components/help/step-expand-affordance";
import { StepIndexBadge } from "@/components/help/step-index-badge";
import { getHelpDataForStep } from "@/components/help/getting-started-help-data";
import type { HelpItem } from "@/components/help/getting-started-help-data";

interface PromptStepProps {
    stepNumber: number;
    title: string;
    description?: string | React.ReactNode;
    copyableContent?: string;
    links?: Array<{ label: string; url: string }>;
    milestoneKey: string;
    completedAt?: string;
    onComplete?: (milestoneKey: string) => void;
    isActionable?: boolean;
    troubleshootingItems?: HelpItem[];
}

function PromptStep({
    stepNumber,
    title,
    description,
    copyableContent,
    links,
    milestoneKey,
    completedAt,
    onComplete,
    isActionable = true,
    troubleshootingItems,
}: PromptStepProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [editableContent, setEditableContent] = useState(copyableContent || "");
    const [isMarking, setIsMarking] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(!!completedAt);
    const [optimisticCompleted, setOptimisticCompleted] = useState<string | undefined>(completedAt);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setOptimisticCompleted(completedAt);
        setIsCollapsed(!!completedAt);
    }, [completedAt]);

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

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const formatCompletionDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
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
                            <p className="mt-1 text-sm text-neutral-600">{description}</p>
                        ) : (
                            <div className="mt-1 text-sm text-neutral-600">{description}</div>
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
                            <textarea
                                value={editableContent}
                                onChange={(e) => setEditableContent(e.target.value)}
                                className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm font-mono text-neutral-700 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1"
                                rows={editableContent.split("\n").length + 2}
                                placeholder="Edit the content here, then copy..."
                            />
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
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

                    {/* Inline troubleshooting */}
                    {troubleshootingItems && troubleshootingItems.length > 0 && (
                        <StepTroubleshooting items={troubleshootingItems} />
                    )}
                    </div>
                )}
            </div>
        </div>
    );
}

interface ConnectingToGitHubTabProps {
    onActiveStepChange?: (milestoneKey: string) => void;
    onCompletionsChange?: (completions: Record<string, string>) => void;
}

export function ConnectingToGitHubTab({ onActiveStepChange, onCompletionsChange }: ConnectingToGitHubTabProps) {
    const [completions, setCompletions] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const stepRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        fetchCompletions();
    }, []);

    // IntersectionObserver to detect active step
    useEffect(() => {
        if (isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
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

    const getHelpItems = (milestoneKey: string) => {
        return getHelpDataForStep(milestoneKey)?.helpItems;
    };

    return (
        <div className="space-y-8 py-8">
            <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold text-neutral-900">Connecting to GitHub</h2>
                <p className="mt-2 text-base text-neutral-600">
                    Get set up with GitHub Enterprise Cloud so you can share your prototypes, collaborate with others, and deploy your work. This guide assumes you already have local admin access on your Xero Mac.
                </p>
            </div>

            {isLoading ? (
                <div className="text-sm text-neutral-600">Loading...</div>
            ) : (
                <div className="space-y-6">
                    <div id="step-github-request-access" data-milestone-key="github-request-access" ref={setStepRef("github-request-access")} className="scroll-mt-24">
                        <PromptStep
                            stepNumber={1}
                            title="Request GitHub Access via Okta"
                            description={
                                <>
                                    <p className="mb-3">GitHub Enterprise Cloud is available through Okta Self Service. Request access using these steps:</p>
                                    <ol className="list-decimal list-inside space-y-2 mb-3">
                                        <li>Go to <a href="https://xero.at.okta.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Okta (xero.at.okta.com)</a></li>
                                        <li>Click the &quot;Okta Access Requests&quot; tile</li>
                                        <li>Search for &quot;Github&quot;</li>
                                        <li>Click &quot;Request Access&quot;</li>
                                        <li>Click &quot;Submit new request&quot;</li>
                                    </ol>
                                    <p>After approval, you&apos;ll see the &quot;GitHub Enterprise Cloud&quot; tile appear in your Okta dashboard.</p>
                                </>
                            }
                            links={[
                                { label: "GitHub Enterprise Cloud Docs", url: "https://paas.xero.dev/docs/github/github-cloud" }
                            ]}
                            milestoneKey="github-request-access"
                            completedAt={completions["github-request-access"]}
                            onComplete={handleComplete}
                            troubleshootingItems={getHelpItems("github-request-access")}
                        />
                    </div>

                    <div id="step-github-setup-account" data-milestone-key="github-setup-account" ref={setStepRef("github-setup-account")} className="scroll-mt-24">
                        <PromptStep
                            stepNumber={2}
                            title="Set Up Your GitHub Account"
                            description={
                                <>
                                    <p className="mb-3">Once you have access, sign in via Okta and set up your profile so teammates can recognize you:</p>
                                    <ol className="list-decimal list-inside space-y-2 mb-3">
                                        <li>Go to <a href="https://xero.at.okta.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Okta (xero.at.okta.com)</a></li>
                                        <li>Click the &quot;GitHub Enterprise Cloud&quot; tile</li>
                                        <li>Sign in using your Xero single sign-on</li>
                                        <li>In GitHub, update your profile name, avatar, and bio so teammates can recognize you</li>
                                        <li>Confirm your Xero email address is set as the primary email on your GitHub Enterprise account</li>
                                    </ol>
                                </>
                            }
                            milestoneKey="github-setup-account"
                            completedAt={completions["github-setup-account"]}
                            onComplete={handleComplete}
                            troubleshootingItems={getHelpItems("github-setup-account")}
                        />
                    </div>

                    <div id="step-github-install-git" data-milestone-key="github-install-git" ref={setStepRef("github-install-git")} className="scroll-mt-24">
                        <PromptStep
                            stepNumber={3}
                            title="Install Git"
                            description={
                                <>
                                    <p className="mb-3">Git can be installed via the Company Portal, or by opening Terminal (press <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono">&#8984;</kbd> + <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono">Space</kbd>, type &quot;Terminal&quot;, and press Enter) and running <code className="bg-neutral-100 px-1 rounded text-sm font-mono">git -v</code>. This will prompt you to install command line tools if they&apos;re not already installed. You need local admin rights for this installation.</p>
                                </>
                            }
                            copyableContent="git -v"
                            milestoneKey="github-install-git"
                            completedAt={completions["github-install-git"]}
                            onComplete={handleComplete}
                            troubleshootingItems={getHelpItems("github-install-git")}
                        />
                    </div>

                    <div id="step-github-create-repository" data-milestone-key="github-create-repository" ref={setStepRef("github-create-repository")} className="scroll-mt-24">
                        <PromptStep
                            stepNumber={4}
                            title="Create Your First Repository"
                            description={
                                <>
                                    <p className="mb-3">Create a repository for your prototype project. This is where your code will live:</p>
                                    <ol className="list-decimal list-inside space-y-2 mb-3">
                                        <li>From GitHub Enterprise Cloud, click &quot;New&quot; to create a new repository</li>
                                        <li>Give it a clear name, for example: <code className="bg-neutral-100 px-1 rounded">prototype-&lt;project-name&gt;</code> or <code className="bg-neutral-100 px-1 rounded">design-spike-&lt;feature-name&gt;</code></li>
                                        <li>Set visibility to <strong>Private</strong> (recommended)</li>
                                        <li>Add a short description so others know what the repo is for</li>
                                        <li>Initialize the repo with a README.md to document what you&apos;re prototyping and how to run it</li>
                                    </ol>
                                    <p>You can then clone this repository into your local <code className="bg-neutral-100 px-1 rounded">~/code</code> folder (Or you could name it Developer or any other word you&apos;d like) and open it in Cursor to start building.</p>
                                </>
                            }
                            milestoneKey="github-create-repository"
                            completedAt={completions["github-create-repository"]}
                            onComplete={handleComplete}
                            troubleshootingItems={getHelpItems("github-create-repository")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
