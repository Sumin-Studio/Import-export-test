import { downloadFileAsBuffer } from "@/lib/dropbox";
import { getAgentConfig } from "@/lib/agent-config";

const TEXT_EXTENSIONS = new Set(["txt", "html", "json", "xml"]);
const PDF_EXTENSION = "pdf";

/** Most common image types for documents/receipts — OCR is run on these via Tesseract.js */
const IMAGE_EXTENSIONS = new Set([
  "png",   // screenshots, scans
  "jpg", "jpeg", "jpe", "jfif",  // photos of receipts, scanned docs
  "gif",
  "webp",  // common in browsers and mobile
  "bmp",   // legacy scans
  "tiff", "tif",  // scanning workflows
]);

/**
 * Run OCR on an image buffer using Tesseract.js. Returns extracted text or undefined on failure.
 */
async function ocrImageBuffer(buffer: Buffer): Promise<string | undefined> {
  let worker: Awaited<ReturnType<typeof import("tesseract.js")["createWorker"]>> | null = null;
  try {
    const Tesseract = await import("tesseract.js");
    worker = await Tesseract.createWorker("eng", 1, { logger: () => {} });
    const {
      data: { text },
    } = await worker.recognize(buffer);
    return (text ?? "").trim() || undefined;
  } catch {
    return undefined;
  } finally {
    if (worker) {
      try {
        await worker.terminate();
      } catch {
        // ignore
      }
    }
  }
}

/**
 * Extract a text preview from a file for classification (PDF, text, and images via OCR).
 * Returns undefined if the file type is not supported or extraction fails.
 */
export async function extractTextPreview(
  accessToken: string,
  path: string,
  fileName: string,
  maxChars: number
): Promise<string | undefined> {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (!ext) return undefined;

  try {
    if (TEXT_EXTENSIONS.has(ext)) {
      const buffer = await downloadFileAsBuffer(accessToken, path);
      const text = buffer.toString("utf-8").slice(0, maxChars);
      return text || undefined;
    }

    if (ext === PDF_EXTENSION) {
      const buffer = await downloadFileAsBuffer(accessToken, path);
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: buffer });
      try {
        const result = await parser.getText();
        await parser.destroy();
        const text = (result?.text ?? "").trim().slice(0, maxChars);
        return text || undefined;
      } catch {
        await parser.destroy();
        throw new Error("PDF parse failed");
      }
    }

    if (IMAGE_EXTENSIONS.has(ext)) {
      const buffer = await downloadFileAsBuffer(accessToken, path);
      const text = await ocrImageBuffer(buffer);
      return text ? text.slice(0, maxChars) : undefined;
    }
  } catch {
    // Ignore extraction errors (e.g. corrupted file, OCR failure); classification falls back to filename only.
  }

  return undefined;
}

/**
 * Get a text preview for classification: extracts content when possible (PDF, text, images via OCR),
 * respecting the agent config character limit.
 */
export async function getClassificationPreview(
  accessToken: string,
  path: string,
  fileName: string
): Promise<string | undefined> {
  const { classificationPreviewChars } = getAgentConfig();
  return extractTextPreview(accessToken, path, fileName, classificationPreviewChars);
}
