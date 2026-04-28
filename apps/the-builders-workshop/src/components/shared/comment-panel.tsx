"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Send, Pencil, Trash2, Check, XCircle } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import type { Comment } from "@/types/supabase";

interface CommentPanelProps {
  sourceType: string;
  sourceId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}

function CommentItem({
  comment,
  currentUserId,
  onUpdate,
  onDelete,
}: {
  comment: Comment;
  currentUserId: string | null | undefined;
  onUpdate: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isOwn = currentUserId === comment.user_id;

  const handleEdit = () => {
    setEditContent(comment.content);
    setIsEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleSave = async () => {
    if (!editContent.trim() || editContent.trim() === comment.content) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    await onUpdate(comment.id, editContent.trim());
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;
    await onDelete(comment.id);
  };

  return (
    <div className="group flex flex-col gap-1 py-3 border-b border-neutral-100 last:border-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-600 shrink-0 uppercase">
            {(comment.user_name ?? "?")[0]}
          </div>
          <span className="text-xs font-medium text-neutral-700 truncate">
            {comment.user_name ?? "Unknown"}
          </span>
          <span className="text-xs text-neutral-400 shrink-0">
            {formatRelativeTime(comment.created_at)}
          </span>
          {comment.updated_at !== comment.created_at && (
            <span className="text-xs text-neutral-400 shrink-0">(edited)</span>
          )}
        </div>
        {isOwn && !isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={handleEdit}
              title="Edit"
              className="p-1 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <Pencil className="h-3 w-3" />
            </button>
            <button
              onClick={handleDelete}
              title="Delete"
              className="p-1 rounded text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-1 space-y-2">
          <textarea
            ref={textareaRef}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Check className="h-3 w-3" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <XCircle className="h-3 w-3" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
          {comment.content}
        </p>
      )}
    </div>
  );
}

export function CommentPanel({
  sourceType,
  sourceId,
  title,
  isOpen,
  onClose,
}: CommentPanelProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchComments = useCallback(async () => {
    if (!isOpen) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        source_type: sourceType,
        source_id: sourceId,
      });
      const res = await fetch(`/api/comments?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setComments(data.comments ?? []);
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false);
    }
  }, [isOpen, sourceType, sourceId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_type: sourceType,
          source_id: sourceId,
          content: newComment.trim(),
        }),
      });

      if (!res.ok) return;

      const data = await res.json();
      setComments((prev) => [data.comment, ...prev]);
      setNewComment("");
    } catch {
      // Silently fail
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string, content: string) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setComments((prev) =>
        prev.map((c) => (c.id === id ? data.comment : c))
      );
    } catch {
      // Silently fail
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (!res.ok) return;
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch {
      // Silently fail
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Comments: ${title}`}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-neutral-200">
          <div className="min-w-0">
            <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
              Comments
            </p>
            <h2 className="mt-0.5 text-base font-semibold text-neutral-900 leading-snug truncate">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-24 text-sm text-neutral-400">
              Loading...
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 text-sm text-neutral-400 text-center">
              <p>No comments yet.</p>
              <p className="text-xs mt-1">Be the first to share a thought.</p>
            </div>
          ) : (
            <div>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  currentUserId={user?.id}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* New comment form */}
        <div className="px-5 py-4 border-t border-neutral-200 bg-neutral-50">
          <form onSubmit={handleSubmit} className="space-y-2">
            <textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }}
              rows={3}
              placeholder="Add a comment… (⌘↵ to submit)"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1 resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                {comments.length} {comments.length === 1 ? "comment" : "comments"}
              </span>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Send className="h-3 w-3" />
                {isSubmitting ? "Posting…" : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}

/**
 * Lightweight trigger button to show comment count and open the panel.
 * Use this anywhere you need to link to the CommentPanel.
 */
export function CommentTrigger({
  count,
  onClick,
}: {
  count: number;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      title="View comments"
      aria-label={`${count} comment${count !== 1 ? "s" : ""}`}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer select-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      {count > 0 && <span>{count}</span>}
    </button>
  );
}
