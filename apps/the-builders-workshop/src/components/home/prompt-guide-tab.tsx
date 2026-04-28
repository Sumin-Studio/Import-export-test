"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, ChevronDown, ChevronRight } from "lucide-react";
import { ReactionButton } from "@/components/shared/reaction-button";
import { CommentPanel, CommentTrigger } from "@/components/shared/comment-panel";

interface PromptCardProps {
    promptId: string;
    title: string;
    description?: string | React.ReactNode;
    prompt: string;
    label?: string;
    onOpenComments: (promptId: string, title: string) => void;
}

function useCommentCount(sourceId: string) {
    const [count, setCount] = useState(0);

    const refresh = useCallback(async () => {
        try {
            const params = new URLSearchParams({ source_type: "prompt", source_id: sourceId });
            const res = await fetch(`/api/comments?${params}`);
            if (!res.ok) return;
            const data = await res.json();
            setCount((data.comments ?? []).length);
        } catch {
            // Non-critical
        }
    }, [sourceId]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { count, refresh };
}

function PromptCard({ promptId, title, description, prompt, label, onOpenComments }: PromptCardProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [editablePrompt, setEditablePrompt] = useState(prompt);
    const [isExpanded, setIsExpanded] = useState(false);
    const { count: commentCount } = useCommentCount(promptId);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(editablePrompt);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const lineCount = editablePrompt.split("\n").length;
    const textareaRows = Math.min(Math.max(lineCount + 1, 6), 20);

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-start hover:bg-neutral-50 transition-colors">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex-1 p-5 text-left cursor-pointer min-w-0"
                >
                    <div className="min-w-0">
                        {label && (
                            <span className="inline-block text-xs font-medium text-neutral-500 mb-1">
                                {label}
                            </span>
                        )}
                        <h4 className="text-base font-semibold text-neutral-900">{title}</h4>
                        {description && !isExpanded && (
                            typeof description === "string" ? (
                                <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{description}</p>
                            ) : (
                                <div className="mt-1 text-sm text-neutral-500 line-clamp-2">{description}</div>
                            )
                        )}
                    </div>
                </button>
                <div className="flex items-center gap-0.5 pt-3.5 pr-3 shrink-0">
                    <ReactionButton sourceType="prompt" sourceId={promptId} />
                    <CommentTrigger
                        count={commentCount}
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenComments(promptId, title);
                        }}
                    />
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                        {isExpanded ? (
                            <ChevronDown className="h-5 w-5" />
                        ) : (
                            <ChevronRight className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="px-5 pb-5 space-y-4">
                    {description && (
                        typeof description === "string" ? (
                            <p className="text-sm text-neutral-600">{description}</p>
                        ) : (
                            <div className="text-sm text-neutral-600">{description}</div>
                        )
                    )}
                    <div className="space-y-2">
                        <div className="relative">
                            <textarea
                                value={editablePrompt}
                                onChange={(e) => setEditablePrompt(e.target.value)}
                                rows={textareaRows}
                                className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 pr-24 text-sm font-mono text-neutral-700 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1 resize-none"
                                placeholder="Edit the prompt before copying..."
                            />
                            <button
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
                        <p className="text-xs text-neutral-400">Edit the prompt above to fit your context, then copy.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

interface PromptSectionProps {
    number: string;
    title: string;
    description?: string;
    children: React.ReactNode;
}

function PromptSection({ number, title, description, children }: PromptSectionProps) {
    return (
        <div className="space-y-4">
            <div>
                <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{number}</span>
                    <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
                </div>
                {description && (
                    <p className="mt-1 text-sm text-neutral-500 max-w-2xl">{description}</p>
                )}
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

interface OpenPanel {
    promptId: string;
    title: string;
}

export function PromptGuideTab() {
    const [openPanel, setOpenPanel] = useState<OpenPanel | null>(null);

    const handleOpenComments = (promptId: string, title: string) => {
        setOpenPanel({ promptId, title });
    };

    const handleCloseComments = () => {
        setOpenPanel(null);
    };

    return (
        <>
        <div className="space-y-12 py-8">
            <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold text-neutral-900">Prompt Guide</h2>
                <p className="mt-2 text-base text-neutral-600">
                    A reusable prompt library for designers working with AI agents, Cursor, Figma Make, and similar tools to create robust prototypes, efficiently. Click any prompt to expand and copy it.
                </p>
            </div>

            {/* Section 1: Figma → Code */}
            <PromptSection
                number="1"
                title="Figma → Code with a Refinement Loop"
            >
                <PromptCard
                    promptId="fe-1.1-figma-to-code"
                    onOpenComments={handleOpenComments}
                    label="1.1"
                    title="Implement a screen from Figma"
                    prompt={`Implement this design: {FIGMA_URL}

You are a front-end engineer pairing with a designer.
Goal: get as close as possible to the Figma design using our design system.

Step 1 – Study the design
- Pull the frame via the Figma MCP. In Figma Desktop, press Cmd+K, type MCP, and open MCP Servers (or the equivalent MCP settings) to connect first.
- If MCP isn't available, open the frame manually.
- Before coding, summarise:
  - Layout structure (sections, grid, major groups)
  - Components and repeated patterns
  - Key visual details (spacing, typography, radii, shadows, borders, alignment, breakpoints)

Step 2 – First pass
- Build an initial React implementation of the screen.
- Use our design system components where possible: [NAME + LINK OR NOTES].
- It is OK if this first pass is wrong; focus on structure over pixel-perfect polish.

Step 3 – Refinement loop (this is the important bit)
Run this loop until we're very close to Figma:

1) Capture a screenshot of the implementation (via Chrome DevTools MCP or manually).
2) Compare it side-by-side with the Figma source.
3) List every difference you can see, including:
   - Spacing
   - Color and opacity
   - Typography (font, size, weight, line-height)
   - Border radius, borders, dividers
   - Shadows and elevation
   - Alignment and layout
   - Responsive behavior at key widths

4) Fix the differences one by one, verifying each fix in the browser.
5) After each loop, update the "difference list" until:
   - You can't spot any obvious visual differences, or
   - Remaining differences are deliberate (e.g. design system constraints).

If something is ambiguous or impossible to implement as spec'd:
- Call it out explicitly.
- Ask me a specific question rather than guessing.`}
                />
            </PromptSection>

            {/* Section 2: Design System */}
            <PromptSection
                number="2"
                title="Using the Design System Intentionally"
            >
                <PromptCard
                    promptId="fe-2.1-design-system-map"
                    onOpenComments={handleOpenComments}
                    label="2.1"
                    title="Map Figma layers to design-system components"
                    prompt={`I want to rebuild this Figma frame using our design system:

Figma:
[Short description of the frame: sections, groups, repeated items]

Design system:
- Name: [e.g. Zooie / XUI]
- Link: [URL]

Act as a design-system-aware front-end engineer.

1) Propose a mapping:
   - For each major part of the screen, list which design-system components to use.
   - Call out any obvious over-engineering or unnecessary custom elements.

2) Generate:
   - A component list (e.g. PageLayout, HeaderBar, FilterBar, ItemRow, EmptyState).
   - A small React example of the main screen that composes these components.

3) Add comments where I should tweak props/variants to better match the Figma visual.`}
                />
            </PromptSection>

            {/* Section 3: States and Error Handling */}
            <PromptSection
                number="3"
                title="States and Error Handling"
            >
                <PromptCard
                    promptId="fe-3.1-state-design"
                    onOpenComments={handleOpenComments}
                    label="3.1"
                    title="Design the states for this screen"
                    prompt={`I'm prototyping this screen:

[Describe what the user is trying to do and what they see]

I don't want just a happy path.

Act as a UX-minded front-end engineer.

1) List the states this screen should account for:
   - Initial / loading
   - "Ready" state
   - Empty / nothing to show
   - Validation errors
   - "Soft" errors (temporary issues, can retry)
   - "Hard" errors (blocked, permissions, unrecoverable)

2) For each state, describe:
   - What the UI should show
   - Where error or helper messages should appear (inline vs banner vs toast)
   - The main action(s) available to the user.

Return this as a small table so I can design each state in Figma and code.`}
                />
                <PromptCard
                    promptId="fe-3.2-add-error-states"
                    onOpenComments={handleOpenComments}
                    label="3.2"
                    title="Add visible error and empty states to an existing component"
                    prompt={`Here is my current component:

[PASTE REACT CODE]

Right now it basically only has a "happy path".
Help me add clear empty and error states without changing behaviour too much.

1) Identify:
   - Where an "empty" state would show up.
   - Where an "error" state would show up (even if it's just a prop or flag for now).

2) Update the component to:
   - Render a distinct empty state (with copy and visual treatment).
   - Render a distinct error state (with message and at least one recovery action, e.g. "Try again", "Go back").

3) Keep your changes small and readable so a designer can keep iterating on the visuals.
Add brief comments explaining each new state.`}
                />
            </PromptSection>

            {/* Section 4: Quick Whole Feature */}
            <PromptSection
                number="4"
                title="Quick &quot;Whole Feature&quot; Prompt for Designers"
            >
                <PromptCard
                    promptId="fe-4.1-whole-feature"
                    onOpenComments={handleOpenComments}
                    label="4.1"
                    title="One prompt for a small front-end prototype"
                    prompt={`You are helping me build a small front-end prototype from a Figma design.
I am a designer; keep things readable and close to the design.

Design:
[FIGMA URL + short description of the flow]

Constraints:
- React only, no backend or data modelling.
- Use our design system components: [NAME / LINK].
- Focus on:
  - Matching layout and visual hierarchy
  - Handling loading/empty/error states
  - Being inspectable and easy for an engineer to wire up later

Please:
1) Propose a minimal component breakdown.
2) Generate starter React code for:
   - The main screen component
   - Any obvious reusable child components
   - A basic status prop or state that supports: loading, ready, empty, error.

3) Then, describe a short refinement loop I can follow (like the Figma vs screenshot comparison) to polish spacing, typography, and alignment until it's very close to the spec.`}
                />
            </PromptSection>

        </div>

        <CommentPanel
            sourceType="prompt"
            sourceId={openPanel?.promptId ?? ""}
            title={openPanel?.title ?? ""}
            isOpen={openPanel !== null}
            onClose={handleCloseComments}
        />
        </>
    );
}
