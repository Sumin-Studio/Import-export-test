"use client";

import { ExternalLink } from "lucide-react";

export function NextStepsTab() {
    return (
        <div className="space-y-8 py-8">
            <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold text-neutral-900">Next Steps</h2>
                <p className="mt-2 text-base text-neutral-600">
                    You&apos;ve got the basics down. Here&apos;s where to go from here.
                </p>
            </div>

            <div className="space-y-6">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-neutral-900">Prototype Playground</h3>
                        <p className="text-sm text-neutral-600">
                            Check out what other designers have been building. The Prototype Playground is a collection of working prototypes from the team — browse them for inspiration, see what&apos;s possible, and get ideas for your own projects.
                        </p>
                        <a
                            href="/prototype-playground"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-700 underline"
                        >
                            Visit the Prototype Playground
                        </a>
                    </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-neutral-900">MCP + Glean + Figma: connect your tools</h3>
                        <p className="text-sm text-neutral-600">
                            MCP (Model Context Protocol) lets Cursor talk directly to tools like Figma and Glean. Once connected, your AI assistant can read your Figma designs and search Xero&apos;s internal docs — no copy-pasting or context-switching needed. Head to the <strong>Build your first projects</strong> tab to set them up (steps 3 and 4).
                        </p>
                        <a
                            href="/making-stuff"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-700 underline"
                        >
                            Set up MCP connections
                        </a>
                    </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-neutral-900">Further reading</h3>
                        <p className="text-sm text-neutral-600">
                            Gideon Steinberg wrote a great guide for designers onboarding into the tools developers use. It covers the developer workflow, how to think about prototyping with real tools, and where things are heading.
                        </p>
                        <a
                            href="https://xero.atlassian.net/wiki/spaces/~gideon.steinberg/blog/271885796478/For+designers+onboarding+into+the+tools+developers+use"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-700 underline"
                        >
                            For designers onboarding into the tools developers use
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
