"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { StepCompletionSwitch } from "@/components/help/step-completion-switch";
import { StepDismissChip, StepExpandAffordance } from "@/components/help/step-expand-affordance";
import { StepIndexBadge } from "@/components/help/step-index-badge";

interface PromptStepProps {
    stepNumber: number;
    title: string;
    description?: string | React.ReactNode;
    copyableContent: string;
    afterContent?: React.ReactNode;
    links?: Array<{ label: string; url: string }>;
    milestoneKey: string;
    completedAt?: string;
    onComplete?: (milestoneKey: string) => void;
    isActionable?: boolean;
}

function PromptStep({
    stepNumber,
    title,
    description,
    copyableContent,
    afterContent,
    links,
    milestoneKey,
    completedAt,
    onComplete,
    isActionable = true
}: PromptStepProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [editableContent, setEditableContent] = useState(copyableContent);
    const [isMarking, setIsMarking] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(!!completedAt);
    const [optimisticCompleted, setOptimisticCompleted] = useState<string | undefined>(completedAt);
    const [error, setError] = useState<string | null>(null);

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
                                </a>
                            ))}
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="relative">
                            <textarea
                                value={editableContent}
                                onChange={(e) => setEditableContent(e.target.value)}
                                className="w-full h-32 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 pr-24 text-sm font-mono text-neutral-700 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1 resize-none overflow-y-auto"
                                placeholder="Edit the content here, then copy..."
                            />
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1 cursor-pointer"
                            >
                                {isCopied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    {afterContent && (
                        <div className="mt-4">
                            {afterContent}
                        </div>
                    )}
                    </div>
                )}
            </div>
        </div>
    );
}

interface MakingStuffTabProps {
    onActiveStepChange?: (milestoneKey: string) => void;
    onCompletionsChange?: (completions: Record<string, string>) => void;
}

export function MakingStuffTab({
    onActiveStepChange,
    onCompletionsChange,
}: MakingStuffTabProps = {}) {
    const [completions, setCompletions] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const stepRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const setStepRef = useCallback((milestoneKey: string) => (el: HTMLDivElement | null) => {
        if (el) {
            stepRefs.current.set(milestoneKey, el);
        } else {
            stepRefs.current.delete(milestoneKey);
        }
    }, []);

    const fetchCompletions = useCallback(async () => {
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
    }, [onCompletionsChange]);

    useEffect(() => {
        fetchCompletions();
    }, [fetchCompletions]);

    useEffect(() => {
        if (isLoading || !onActiveStepChange) return;
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
                        onActiveStepChange(key);
                    }
                }
            },
            { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        stepRefs.current.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [isLoading, onActiveStepChange]);

    if (isLoading) {
        return (
            <div className="space-y-8 pb-8 pt-0">
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-semibold text-neutral-900">Building Stuff</h2>
                    <p className="mt-2 text-base text-neutral-600">
                        Prompts and guides to help you build your first webpage and app. Copy these prompts into Cursor to get started.
                    </p>
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="text-neutral-600">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8 pt-0">
            <div className="space-y-6">
                <div
                    id="step-create-first-html-file"
                    data-milestone-key="create-first-html-file"
                    ref={setStepRef("create-first-html-file")}
                    className="scroll-mt-24"
                >
                <PromptStep
                    stepNumber={1}
                    title="Create your first HTML file"
                    description={
                        <div className="space-y-3">
                            <p>
                                Start with the simplest possible webpage - a single HTML file you can open directly in your browser. No setup needed, just pure HTML and CSS.
                            </p>
                            <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                                <p className="font-semibold text-sm text-neutral-900">Before using the prompt:</p>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-700">
                                    <li>In your home directory, find your &quot;code&quot; directory (or create it if you don&apos;t have one)</li>
                                    <li>Inside your code directory, create a new folder called <code className="bg-neutral-200 px-1 rounded">simple html demo</code></li>
                                    <li>Open Cursor, select &quot;New Window&quot; from the menu, then choose &quot;Open project&quot; and select the &quot;simple html demo&quot; folder you just created</li>
                                    <li>Once Cursor is open with your empty folder, copy and paste the prompt below into Cursor&apos;s chat</li>
                                </ol>
                                <p className="font-semibold text-sm text-neutral-900 mt-4">After Cursor creates your file:</p>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-700">
                                    <li>Open Finder and navigate to your &quot;simple html demo&quot; folder</li>
                                    <li>Find the <code className="bg-neutral-200 px-1 rounded">index.html</code> file</li>
                                    <li>Double-click the file to open it in your web browser - that&apos;s it! Your webpage will appear.</li>
                                </ol>
                            </div>
                        </div>
                    }
                    copyableContent={`I want to create a simple, cute HTML page. I'm completely new to coding, so please make it straightforward and easy to understand.

IMPORTANT: This should be a simple HTML file only - NO Next.js, NO frameworks, NO build tools. Just pure HTML and CSS in a single file.

Create a single HTML file called index.html that:
- Has a simple, cute design with nice colors
- Uses inline CSS (everything in one file - no separate CSS files)
- Is pure HTML - no JavaScript frameworks, no build process, no package.json
- Can be opened directly in a web browser by double-clicking the file
- Has a clean, modern look that feels polished
- Includes these exact lines of text (keep them exactly as written):
  "Welcome to my first webpage!"
  "This is so cool!"
  "I made this myself!"
- Includes a section titled "Try modifying it:" with the following text displayed on the webpage:
  "Once you see your webpage, go back to Cursor and try asking it to change the design! Here's a fun idea:"
  Then randomly pick ONE example query from this list and display only that one:
  - "Now make it look like Halloween"
  - "Now make it look cyberpunk"
  - "Now make it talk like a pirate"
  - "Now make it look like a retro 80s design"
  - "Now make it look like a cozy coffee shop"
  - "Now make it look like a space theme"
  - "Now make it look like a beach vacation"
  - "Now make it look like a vintage newspaper"
  - "Now make it look like a neon sign"
  - "Now make it look like a zen garden"
  Then include: "Pick any style you like - Cursor will update your HTML file and you can refresh your browser to see the changes!"
- Does NOT include any encouraging messages like "You're doing great!" or "Keep learning" - just the actual webpage content

Make it something simple but delightful - maybe a welcome page, a personal card, or a simple landing page. Keep it beginner-friendly and make sure I can just double-click the file to see it in my browser.`}
                    milestoneKey="create-first-html-file"
                    completedAt={completions["create-first-html-file"]}
                    onComplete={() => {
                        fetchCompletions();
                    }}
                />
                </div>

                <div
                    id="step-create-first-web-app"
                    data-milestone-key="create-first-web-app"
                    ref={setStepRef("create-first-web-app")}
                    className="scroll-mt-24"
                >
                <PromptStep
                    stepNumber={2}
                    title="Create your first web app"
                    description={
                        <div className="space-y-3">
                            <p>
                                Build a more robust website using Next.js - a modern framework that makes building beautiful websites easier. This will create a proper project structure you can build on.
                            </p>
                            <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                                <p className="font-semibold text-sm text-neutral-900">Before using the prompt:</p>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-700">
                                    <li>In your code directory, create a new folder called <code className="bg-neutral-200 px-1 rounded">simple web app demo</code> (like above)</li>
                                    <li>Open Cursor, select &quot;New Window&quot; from the menu, then choose &quot;Open project&quot; and select the &quot;simple web app demo&quot; folder you just created (also like above)</li>
                                    <li>Once Cursor is open with your empty folder, copy and paste the prompt below into Cursor&apos;s chat (sound familiar?)</li>
                                </ol>

                            </div>
                        </div>
                    }
                    copyableContent={`I want to create a beautiful, robust website template using Next.js. I'm a designer learning to code, so please make it modern and visually appealing.

Please set up:
1. A new Next.js 15 project with TypeScript
2. Tailwind CSS for styling
3. A beautiful, modern website template with:
   - A clean, professional design
   - Multiple sections (hero, features, about, etc.)
   - Beautiful typography and spacing
   - Nice color scheme
   - Responsive design that works on mobile and desktop
   - Smooth animations or transitions
   - Modern UI components

I only require Cursor access at Xero for this workflow.
Use whatever package manager and run commands are appropriate for this project and environment, and explain what you chose.
After setup:
1. Install dependencies
2. Start the local development server
3. Tell me exactly which URL to open in my browser

Make it a complete, polished template I can use as a starting point for future projects.`}
                    milestoneKey="create-first-web-app"
                    completedAt={completions["create-first-web-app"]}
                    onComplete={() => {
                        fetchCompletions();
                    }}
                />
                </div>

                <div className="pt-4">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Connect your tools to Cursor</h3>
                    <p className="text-sm text-neutral-600 max-w-3xl">
                        This is where things get really powerful. MCP (Model Context Protocol) lets Cursor talk directly to tools like Figma and Glean. Once connected, your AI assistant can read your Figma designs and search all of Xero&apos;s internal docs. Paste these prompts into Cursor and the agent will set everything up for you.
                    </p>
                </div>

                <div
                    id="step-connect-figma-mcp"
                    data-milestone-key="connect-figma-mcp"
                    ref={setStepRef("connect-figma-mcp")}
                    className="scroll-mt-24"
                >
                <PromptStep
                    stepNumber={3}
                    title="Connect Figma MCP"
                    description={
                        <div className="space-y-3">
                            <p>
                                This connects Cursor directly to your Figma files. Once it&apos;s working, you can select any frame in Figma, copy the link (<code className="bg-neutral-200 px-1 rounded">⌘L</code>), paste it into Cursor, and ask it to build what it sees. The agent will read your design&apos;s layout, colors, and components, then generate code to match.
                            </p>
                            <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                                <p className="font-semibold text-sm text-neutral-900">Before you paste:</p>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-700">
                                    <li>Open <strong>Figma Desktop</strong> (not the browser version)</li>
                                    <li>Press <code className="bg-neutral-200 px-1 rounded">⌘K</code>, type <strong>MCP</strong>, then open <strong>MCP Servers</strong> (or the equivalent MCP settings entry)</li>
                                    <li>Enable the local MCP server / Figma MCP from that panel</li>
                                    <li>Leave Figma open — it runs a local server that Cursor connects to</li>
                                </ol>
                            </div>
                        </div>
                    }
                    afterContent={
                        <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                            <p className="font-semibold text-sm text-neutral-900">After the agent finishes:</p>
                            <p className="text-sm text-neutral-700">Restart Cursor, then try the smoke test: in Figma, select a frame and press <code className="bg-neutral-200 px-1 rounded">⌘L</code> to copy the link. Paste it into a Cursor chat and ask <em>&quot;Build this screen in HTML, CSS and vanilla JavaScript.&quot;</em> If you see tool calls appearing (Cursor reading your Figma file), you&apos;re connected. Figma Desktop needs to be open for this to work.</p>
                        </div>
                    }
                    copyableContent={`I need you to set up the Figma MCP connection for Cursor.

Edit (or create) the file at ~/.cursor/mcp.json. If it already exists with other MCP servers configured, merge this new entry into the existing "mcpServers" object — don't overwrite what's already there.

Add this server:

{
  "Figma": {
    "url": "http://127.0.0.1:3845/sse",
    "headers": {}
  }
}

After you've updated the file, show me the final contents of ~/.cursor/mcp.json so I can verify it looks right.

Note: I'll need to restart Cursor after this for the changes to take effect.`}
                    milestoneKey="connect-figma-mcp"
                    completedAt={completions["connect-figma-mcp"]}
                    onComplete={() => {
                        fetchCompletions();
                    }}
                />
                </div>

                <div
                    id="step-connect-glean-mcp"
                    data-milestone-key="connect-glean-mcp"
                    ref={setStepRef("connect-glean-mcp")}
                    className="scroll-mt-24"
                >
                <PromptStep
                    stepNumber={4}
                    title="Connect Glean MCP"
                    description={
                        <p>
                            This connects Cursor to Glean, which indexes all of Xero&apos;s internal knowledge — Confluence, Slack, Jira, Google Drive, and more. Once connected, your AI assistant can search and reference Xero&apos;s actual docs instead of guessing from generic internet knowledge.
                        </p>
                    }
                    afterContent={
                        <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 space-y-4">
                            <div className="space-y-2">
                                <p className="font-semibold text-sm text-neutral-900">After the agent finishes:</p>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-700">
                                    <li>Restart Cursor</li>
                                    <li>Go to <strong>Cursor → Settings… → Cursor Settings → Tools & MCP</strong> tab and find <code className="bg-neutral-200 px-1 rounded">glean_default</code></li>
                                    <li>If it says <strong>&quot;Needs authentication&quot;</strong>, click that text — it&apos;ll open Xero SSO in your browser. Approve the scopes (Slack, Jira, Confluence, etc.)</li>
                                </ol>
                            </div>
                            <div className="space-y-2">
                                <p className="font-semibold text-sm text-neutral-900">Smoke test:</p>
                                <p className="text-sm text-neutral-700">In a Cursor chat, try: <em>&quot;Using the Glean MCP, search Xero Confluence for &apos;Glean MCP Server&apos; and summarise the page.&quot;</em> If you get an answer that cites actual Xero docs, you&apos;re wired up.</p>
                            </div>
                        </div>
                    }
                    copyableContent={`I need you to set up the Glean MCP connection for Cursor.

Edit (or create) the file at ~/.cursor/mcp.json. If it already exists with other MCP servers configured (like Figma), merge this new entry into the existing "mcpServers" object — don't overwrite what's already there.

Add this server:

{
  "glean_default": {
    "type": "http",
    "url": "https://xero-be.glean.com/mcp/default"
  }
}

After you've updated the file, show me the final contents of ~/.cursor/mcp.json so I can verify it looks right.

Note: I'll need to restart Cursor after this and authenticate through Xero SSO before Glean will work.`}
                    milestoneKey="connect-glean-mcp"
                    completedAt={completions["connect-glean-mcp"]}
                    onComplete={() => {
                        fetchCompletions();
                    }}
                />
                </div>
            </div>
        </div>
    );
}
