"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Star, ExternalLink, Copy, Check } from "lucide-react";
import { getPrototypes } from "@/lib/prototypes";
import type { Showcase } from "@/lib/showcases";
import { PlaygroundCard, PlaygroundItem } from "./playground-card";
import { Button } from "@/components/ui/button";
import { SubmitShowcaseForm } from "@/components/showcases/submit-showcase-form";
import { EditShowcaseForm } from "@/components/showcases/edit-showcase-form";
import { ChangelogModal } from "@/components/showcases/changelog-modal";
import { EditBasePrototypeModal } from "./edit-base-prototype-modal";

const hiddenPrototypeSlugs = new Set([
  "james-buchanan-builder-tool-v1", // Hidden - figma:asset import issue
  "angus-replit-v1", // Hidden - needs router fix, complex build
]);

export function PrototypePlaygroundTab() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const router = useRouter();
  const adminEmails = new Set(["jon.bell@xero.com"]);
  const isAdmin = user?.email
    ? adminEmails.has(user.email.toLowerCase())
    : false;
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [editingShowcase, setEditingShowcase] = useState<Showcase | null>(null);
  const [changelogShowcaseId, setChangelogShowcaseId] = useState<string | null>(null);
  const [editingBasePrototype, setEditingBasePrototype] = useState<PlaygroundItem | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    fetchShowcases();
  }, []);

  const fetchShowcases = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/showcases");
      if (response.ok) {
        const data = await response.json();
        setShowcases(data.showcases);
      }
    } catch (error) {
      console.error("Error fetching showcases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const basePrototypes: PlaygroundItem[] = useMemo(() => {
    const placeholderDate = "2025-09-15T00:00:00Z";
    return getPrototypes()
      .filter((p) => !hiddenPrototypeSlugs.has(p.slug))
      .map((prototype) => ({
        id: prototype.slug,
        title: prototype.title || prototype.folderName || prototype.designer,
        subtitle: prototype.designer,
        description: prototype.summary,
        type: "base" as const,
        viewUrl: prototype.viewUrl || (prototype.hasLocalCode ? `/prototypes/${prototype.slug}` : null),
        changelogUrl: prototype.changelogPath ? `/prototypes/${prototype.slug}/changelog` : null,
        createdAt: placeholderDate,
        updatedAt: placeholderDate,
      }));
  }, []);

  const showcaseById = useMemo(
    () => new Map(showcases.map((showcase) => [showcase.id, showcase])),
    [showcases]
  );

  const communityItems: PlaygroundItem[] = useMemo(
    () =>
      showcases.map((showcase) => ({
        id: showcase.id,
        title: showcase.title,
        subtitle: showcase.author_name || showcase.author_email || "Community build",
        description: showcase.description,
        type: "community" as const,
        externalUrl: showcase.deployed_url || null,
        githubUrl: showcase.github_url || null,
        createdAt: showcase.created_at,
        updatedAt: showcase.updated_at,
        authorUserId: showcase.author_user_id,
        basePrototypeSlug: showcase.base_prototype_slug,
      })),
    [showcases]
  );

  // Separate featured starter from legacy prototypes
  const featuredPrototype = useMemo(
    () => basePrototypes.find((p) => p.id === "get-paid-replica-starter"),
    [basePrototypes]
  );

  const legacyPrototypes = useMemo(
    () => basePrototypes.filter((p) => p.id !== "get-paid-replica-starter"),
    [basePrototypes]
  );

  const allItems = useMemo(
    () => {
      const communitySorted = [...communityItems].sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate; // newest first
      });
      return [...communitySorted, ...basePrototypes];
    },
    [communityItems, basePrototypes]
  );

  const handleEdit = (id: string) => {
    const foundShowcase = showcaseById.get(id);
    if (foundShowcase) {
      setEditingShowcase(foundShowcase);
      return;
    }
    const foundBase = basePrototypes.find((p) => p.id === id);
    if (foundBase) {
      if (!isAdmin) {
        alert("Only admins can edit base prototypes.");
        return;
      }
      setEditingBasePrototype(foundBase);
      return;
    }
    alert("You don't have permission to edit this item.");
  };

  const handleShowcaseCreated = () => {
    fetchShowcases();
  };

  const repoUrl = "git@github.com:xero-internal-actions-poc/design-starter-template.git";

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(repoUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-6 py-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-neutral-900">Prototype Playground</h2>
        <p className="text-sm text-neutral-600">
          Base prototypes and community builds, combined into one list.
        </p>
      </div>

      <div className="space-y-6">
        {isLoading && (
          <p className="text-sm text-neutral-500">Loading prototypes...</p>
        )}

        {/* Featured Starter Template Section */}
        {!isLoading && featuredPrototype && (
          <div className="space-y-6">
            <div className="border-2 border-brand rounded-lg p-6 bg-blue-50">
              <div className="flex items-start gap-3 mb-4">
                <Star className="h-6 w-6 text-brand fill-brand flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Official Starter Template</h3>
                  <p className="text-sm text-neutral-700">Fork this template to begin your prototype</p>
                </div>
              </div>

              {/* Large Screenshot Preview */}
              <div className="rounded-lg overflow-hidden border border-neutral-200 shadow-lg mb-4">
                <img
                  src="/starter-template-preview.png"
                  alt="Get Paid Starter Template - Xero accounting interface with Stripe integration"
                  className="w-full h-auto"
                />
              </div>

              {/* Directions */}
              <div className="bg-white rounded-lg border border-neutral-200 p-4">
                <p className="text-sm font-semibold text-neutral-900 mb-3">Directions:</p>
                <div className="space-y-3">
                  <ol className="text-sm text-neutral-700 space-y-2 list-decimal list-inside">
                    <li>Open Cursor</li>
                    <li>Clone repo</li>
                    <li>Paste the URL below</li>
                  </ol>

                  <div className="flex items-center gap-2 ml-5">
                    <code className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs font-mono text-neutral-800 overflow-x-auto">
                      {repoUrl}
                    </code>
                    <button
                      onClick={handleCopyUrl}
                      className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900 text-white rounded text-xs font-medium hover:bg-neutral-800 transition-colors flex-shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <ol start={4} className="text-sm text-neutral-700 space-y-2 list-decimal list-inside">
                    <li>Prompt Cursor with: <em>&quot;Hi. Please get this running on my computer and add confetti when I press the c key&quot;</em></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Builds Section */}
        {!isLoading && communityItems.length > 0 && (
          <div className="space-y-3 mt-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Community Builds</h3>
                <p className="text-sm text-neutral-600">
                  Prototypes shared by the builder community
                </p>
              </div>
              <Button
                onClick={() => setShowSubmitForm(true)}
                size="sm"
                className="bg-neutral-900 text-white hover:bg-neutral-800 flex-shrink-0"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Share Your Work
              </Button>
            </div>
            <div className="space-y-3">
              {communityItems.map((item) => {
                const showcase = showcaseById.get(item.id);
                return (
                  <PlaygroundCard
                    key={item.id}
                    item={item}
                    canEdit={
                      isAdmin ||
                      (!!userId && showcase?.author_user_id === userId)
                    }
                    onEdit={handleEdit}
                  />
                );
              })}
            </div>
          </div>
        )}

        {!isLoading && allItems.length === 0 && (
          <p className="text-sm text-neutral-600">No prototypes yet. Add one to get started.</p>
        )}
      </div>

      {/* Modals */}
      {showSubmitForm && (
        <SubmitShowcaseForm
          onClose={() => setShowSubmitForm(false)}
          onSuccess={handleShowcaseCreated}
        />
      )}

      {editingShowcase && (
        <EditShowcaseForm
          showcase={editingShowcase}
          onClose={() => setEditingShowcase(null)}
          onSuccess={fetchShowcases}
          onDelete={fetchShowcases}
        />
      )}

      {editingBasePrototype && (
        <EditBasePrototypeModal
          item={editingBasePrototype}
          adminEmail={user?.email || undefined}
          onClose={() => setEditingBasePrototype(null)}
          onSaved={() => {
            setEditingBasePrototype(null);
            router.refresh();
          }}
        />
      )}

      {changelogShowcaseId && (
        <ChangelogModal
          showcaseId={changelogShowcaseId}
          currentUserId={userId}
          onClose={() => setChangelogShowcaseId(null)}
        />
      )}
    </div>
  );
}
