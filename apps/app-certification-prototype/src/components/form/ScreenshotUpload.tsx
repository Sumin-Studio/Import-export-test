"use client";

import { useRef, type ChangeEvent, type DragEvent } from "react";

export type ScreenshotAttachment = {
  id: string;
  name: string;
  dataUrl: string;
  caption: string;
};

function randomId() {
  return `s_${Math.random().toString(36).slice(2, 10)}`;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function ScreenshotUpload({
  label = "Screenshots",
  hint = "Drop images here, or click to browse. PNG or JPG.",
  value,
  onChange,
  maxFiles = 4,
}: {
  label?: string;
  hint?: string;
  value: ScreenshotAttachment[];
  onChange: (next: ScreenshotAttachment[]) => void;
  maxFiles?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = async (files: FileList | File[]) => {
    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const remaining = Math.max(0, maxFiles - value.length);
    const toAdd = images.slice(0, remaining);
    const attachments: ScreenshotAttachment[] = await Promise.all(
      toAdd.map(async (file) => ({
        id: randomId(),
        name: file.name,
        dataUrl: await readAsDataUrl(file),
        caption: "",
      })),
    );
    if (attachments.length) onChange([...value, ...attachments]);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) void addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) void addFiles(e.dataTransfer.files);
  };

  const removeAt = (id: string) =>
    onChange(value.filter((a) => a.id !== id));

  const updateCaption = (id: string, caption: string) =>
    onChange(value.map((a) => (a.id === id ? { ...a, caption } : a)));

  const reachedLimit = value.length >= maxFiles;

  return (
    <div>
      <div className="mb-1 text-[13px] font-bold leading-5 text-[#404756]">
        {label}
        <span className="ml-1 font-normal text-[rgba(0,10,30,0.75)]">
          (optional)
        </span>
      </div>

      {!reachedLimit && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-border-primary bg-background-tertiary/40 px-4 py-5 text-center hover:border-action-primary hover:bg-action-tertiary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary/40"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-content-secondary"
            aria-hidden="true"
          >
            <path
              d="M10 13V4m0 0l-3 3m3-3l3 3M4 14v1a2 2 0 002 2h8a2 2 0 002-2v-1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-[13px] font-bold text-content-primary">
            Upload screenshot{maxFiles > 1 ? "s" : ""}
          </div>
          <div className="text-[12px] text-content-secondary">{hint}</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple={maxFiles > 1}
            className="hidden"
            onChange={handleInput}
          />
        </div>
      )}

      {value.length > 0 && (
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {value.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-2 rounded-lg border border-border-secondary bg-white p-2"
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.dataUrl}
                  alt={a.caption || a.name}
                  className="h-36 w-full rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeAt(a.id)}
                  aria-label={`Remove ${a.name}`}
                  className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3l6 6M9 3l-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <input
                value={a.caption}
                onChange={(e) => updateCaption(a.id, e.target.value)}
                placeholder="Add a caption (e.g. Settings → Integrations)"
                className="h-10 w-full rounded-[3px] border border-[#a6a9b0] bg-white px-[15px] text-[15px] text-[#000a1e] placeholder:text-content-secondary focus-visible:border-[#0078c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,120,200,0.2)]"
              />
              <div
                className="truncate text-[11px] text-content-secondary"
                title={a.name}
              >
                {a.name}
              </div>
            </li>
          ))}
        </ul>
      )}

      {reachedLimit && (
        <div className="mt-2 text-[12px] text-content-secondary">
          Maximum of {maxFiles} screenshots attached.
        </div>
      )}
    </div>
  );
}
