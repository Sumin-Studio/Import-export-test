import { spawn } from "node:child_process";
import { mkdtemp, unlink, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PORT = parseInt(process.env.PORT ?? "3000", 10) || 3000;
const PUBLIC_DIR = join(import.meta.dir, "public");

async function convertToGif(
  inputPath: string,
  outputPath: string,
  options: {
    width: number;
    fps: number;
    loop: boolean;
    quality: "low" | "medium" | "high";
    startTime?: number;
    duration?: number;
  }
): Promise<void> {
  const { width, fps, loop, quality, startTime = 0, duration } = options;
  // -2 keeps height even (required by some codecs)
  const scaleFilter = `scale=${width}:-2:flags=lanczos`;
  const fpsFilter = `fps=${fps}`;
  const useDuration = duration != null && duration > 0;

  if (quality === "low") {
    const args = [
      "-y",
      ...(startTime > 0 ? ["-ss", String(startTime)] : []),
      ...(useDuration ? ["-t", String(duration)] : []),
      "-i",
      inputPath,
      "-vf",
      `${fpsFilter},${scaleFilter}`,
      "-loop",
      loop ? "0" : "1",
      outputPath,
    ];
    await runFfmpeg(args);
    return;
  }

  const paletteGen = quality === "high"
    ? `palettegen=stats_mode=diff:max_colors=256`
    : `palettegen=max_colors=128`;
  const filterComplex = `[0:v]${fpsFilter},${scaleFilter},split[a][b];[a]${paletteGen}[p];[b][p]paletteuse`;

  const args = [
    "-y",
    ...(startTime > 0 ? ["-ss", String(startTime)] : []),
    ...(useDuration ? ["-t", String(duration)] : []),
    "-i",
    inputPath,
    "-lavfi",
    filterComplex,
    "-loop",
    loop ? "0" : "1",
    outputPath,
  ];

  await runFfmpeg(args);
}

function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    proc.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    proc.on("close", (code) => {
      if (code === 0) return resolve();
      const lastLine = stderr.trim().split(/\r?\n/).filter(Boolean).slice(-3).join(" ");
      reject(new Error(lastLine || `ffmpeg exited ${code}`));
    });
    proc.on("error", (err) => reject(err));
  });
}

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      const file = join(PUBLIC_DIR, "index.html");
      return new Response(Bun.file(file), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    if (url.pathname === "/convert" && req.method === "POST") {
      const contentType = req.headers.get("Content-Type") ?? "";
      if (!contentType.includes("multipart/form-data")) {
        return new Response(JSON.stringify({ error: "Expected multipart/form-data" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const formData = await req.formData();
      const file = formData.get("video");
      if (!file || !(file instanceof File)) {
        return new Response(JSON.stringify({ error: "Missing 'video' file" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const width = Math.min(1280, Math.max(160, parseInt(String(formData.get("width") ?? "480"), 10) || 480));
      const fps = Math.min(30, Math.max(5, parseInt(String(formData.get("fps") ?? "12"), 10) || 12));
      const loop = String(formData.get("loop")).toLowerCase() !== "false" && String(formData.get("loop")) !== "0";
      const quality = (formData.get("quality") as string) || "medium";
      const startTime = parseFloat(String(formData.get("startTime") ?? "0")) || 0;
      const durationRaw = formData.get("duration");
      const duration = durationRaw != null && String(durationRaw).trim() !== "" ? parseFloat(String(durationRaw)) : undefined;

      const tmpDir = await mkdtemp(join(tmpdir(), "frame-of-mind-"));
      const inputPath = join(tmpDir, "input.mp4");
      const outputPath = join(tmpDir, "output.gif");

      try {
        await Bun.write(inputPath, file);
        await convertToGif(inputPath, outputPath, {
          width,
          fps,
          loop,
          quality: quality === "high" || quality === "low" ? quality : "medium",
          startTime,
          duration,
        });

        const gifBlob = Bun.file(outputPath);
        const body = await gifBlob.arrayBuffer();
        const name = file.name.replace(/\.[^.]+$/, "") + ".gif";

        await rm(tmpDir, { recursive: true, force: true }).catch(() => {});

        return new Response(body, {
          headers: {
            "Content-Type": "image/gif",
            "Content-Disposition": `attachment; filename="${name}"`,
          },
        });
      } catch (err) {
        await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
        const message = err instanceof Error ? err.message : "Conversion failed";
        return new Response(JSON.stringify({ error: message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Frame of mind: http://localhost:${server.port}`);
console.log("Requires ffmpeg installed (e.g. brew install ffmpeg)");
