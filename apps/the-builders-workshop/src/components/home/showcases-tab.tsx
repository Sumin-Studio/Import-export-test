"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth-provider";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShowcaseGallery } from "@/components/showcases/showcase-gallery";
import { SubmitShowcaseForm } from "@/components/showcases/submit-showcase-form";
import { EditShowcaseForm } from "@/components/showcases/edit-showcase-form";
import { ChangelogModal } from "@/components/showcases/changelog-modal";
import type { Showcase } from "@/lib/showcases";

export function ShowcasesTab() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [editingShowcase, setEditingShowcase] = useState<Showcase | null>(null);
  const [changelogShowcaseId, setChangelogShowcaseId] = useState<string | null>(null);

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

  const handleShowcaseCreated = () => {
    fetchShowcases();
  };

  const handleShowcaseUpdated = () => {
    fetchShowcases();
  };

  const handleEdit = (showcase: Showcase) => {
    setEditingShowcase(showcase);
  };

  const handleViewChangelog = (showcase: Showcase) => {
    setChangelogShowcaseId(showcase.id);
  };

  const handleShowcaseDeleted = () => {
    fetchShowcases(); // Refresh the list after deletion
  };

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">
              Builds by the community
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              See what the team has been building. Share your work and inspire others.
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
      </div>

      {/* Gallery */}
      <ShowcaseGallery
        showcases={showcases}
        currentUserId={userId}
        isLoading={isLoading}
        onEdit={handleEdit}
        onViewChangelog={handleViewChangelog}
      />

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
          onSuccess={handleShowcaseUpdated}
          onDelete={handleShowcaseDeleted}
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

