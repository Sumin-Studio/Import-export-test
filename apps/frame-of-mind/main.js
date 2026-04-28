import { GIFEncoder, quantize, applyPalette } from "gifenc";

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("file");
const convertBtn = document.getElementById("convert");
const result = document.getElementById("result");
const preview = document.getElementById("preview");
const downloadLink = document.getElementById("download");
const copyBtn = document.getElementById("copyLink");
const messageEl = document.getElementById("message");
const widthSlider = document.getElementById("width");
const widthValue = document.getElementById("widthValue");
const trimStart = document.getElementById("trimStart");
const trimEnd = document.getElementById("trimEnd");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const trimFill = document.getElementById("trimFill");

let selectedFile = null;
let videoDuration = 0;

function getVideoDuration(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.onloadedmetadata = () => {
      const d = video.duration;
      URL.revokeObjectURL(video.src);
      resolve(d);
    };
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error("Could not load video"));
    };
    video.src = URL.createObjectURL(file);
  });
}

function updateTrimFill() {
  if (!trimFill || videoDuration <= 0) return;
  const start = parseFloat(trimStart.value) || 0;
  const end = parseFloat(trimEnd.value) ?? videoDuration;
  const pctStart = (start / videoDuration) * 100;
  const pctEnd = (end / videoDuration) * 100;
  trimFill.style.left = pctStart + "%";
  trimFill.style.width = (pctEnd - pctStart) + "%";
}

function setTrimFromInputs() {
  const start = parseFloat(startTimeInput.value) || 0;
  const endRaw = endTimeInput.value.trim();
  const end = endRaw === "" ? videoDuration : parseFloat(endRaw);
  if (videoDuration > 0) {
    trimStart.max = videoDuration;
    trimEnd.max = videoDuration;
    trimStart.value = Math.min(start, videoDuration);
    trimEnd.value = endRaw === "" ? videoDuration : Math.min(Math.max(end, start), videoDuration);
    updateTrimFill();
  }
}

function setInputsFromTrim() {
  const start = parseFloat(trimStart.value) || 0;
  const end = parseFloat(trimEnd.value) ?? videoDuration;
  startTimeInput.value = start.toFixed(1);
  endTimeInput.value = end >= videoDuration - 0.01 ? "" : end.toFixed(1);
  updateTrimFill();
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message " + type;
  messageEl.classList.remove("hidden");
}

function hideMessage() {
  messageEl.classList.add("hidden");
}

function seekVideo(video, t) {
  return new Promise((resolve) => {
    video.onseeked = () => resolve();
    video.currentTime = t;
  });
}

/** Convert video to GIF using canvas + gifenc (no FFmpeg, works on static pages). */
async function convertVideoToGif(file, settings) {
  const width = Math.min(1280, Math.max(160, settings.width | 0)) || 480;
  const fps = Math.min(30, Math.max(5, settings.fps | 0)) || 12;
  const loop = settings.loop !== false;
  const startTime = Math.max(0, parseFloat(settings.startTime) || 0);
  const endTimeSetting =
    settings.endTime != null && String(settings.endTime).trim() !== ""
      ? parseFloat(settings.endTime)
      : undefined;
  const maxColors = settings.quality === "high" ? 256 : settings.quality === "medium" ? 192 : 128;

  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = URL.createObjectURL(file);

  await new Promise((resolve, reject) => {
    video.onloadedmetadata = resolve;
    video.onerror = () => reject(new Error("Could not load video"));
  });

  const endTime = endTimeSetting != null && endTimeSetting > 0
    ? Math.min(endTimeSetting, video.duration)
    : video.duration;
  const duration = Math.max(0, endTime - startTime);

  const aspect = video.videoHeight / video.videoWidth;
  const w = width;
  const h = Math.max(2, Math.round(width * aspect));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  const frameInterval = 1 / fps;
  const gif = GIFEncoder();
  const delayMs = Math.round(1000 / fps);

  let first = true;
  for (let t = startTime; t < endTime - 0.001; t += frameInterval) {
    await seekVideo(video, t);
    ctx.drawImage(video, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    const rgba = imageData.data;

    const palette = quantize(rgba, maxColors);
    const index = applyPalette(rgba, palette);

    gif.writeFrame(index, w, h, {
      palette,
      delay: delayMs,
      repeat: first && !loop ? -1 : first && loop ? 0 : undefined,
    });
    first = false;
  }

  gif.finish();
  URL.revokeObjectURL(video.src);
  return gif.bytes();
}

dropzone.addEventListener("click", () => fileInput.click());
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("dragover");
});
dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
async function onVideoSelected(file) {
  selectedFile = file;
  convertBtn.disabled = false;
  startTimeInput.value = "0";
  endTimeInput.value = "";
  if (trimStart) trimStart.value = 0;
  if (trimEnd) trimEnd.value = 100;
  videoDuration = 0;
  try {
    videoDuration = await getVideoDuration(file);
    if (trimStart) trimStart.max = videoDuration;
    if (trimEnd) trimEnd.max = videoDuration;
    if (trimStart) trimStart.value = 0;
    if (trimEnd) trimEnd.value = videoDuration;
    endTimeInput.placeholder = videoDuration.toFixed(1) + " (full)";
    updateTrimFill();
    showMessage(`Ready: ${file.name} (${videoDuration.toFixed(1)}s)`, "success");
  } catch {
    showMessage(`Ready: ${file.name}`, "success");
  }
}

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("dragover");
  const file = e.dataTransfer?.files?.[0];
  if (file && file.type.startsWith("video/")) {
    onVideoSelected(file);
  } else {
    showMessage("Please drop a video file.", "error");
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  if (file) onVideoSelected(file);
});

trimStart.addEventListener("input", () => {
  const start = parseFloat(trimStart.value) || 0;
  const end = parseFloat(trimEnd.value) ?? videoDuration;
  if (end < start) trimEnd.value = start;
  setInputsFromTrim();
});
trimEnd.addEventListener("input", () => {
  const start = parseFloat(trimStart.value) || 0;
  const end = parseFloat(trimEnd.value) ?? videoDuration;
  if (start > end) trimStart.value = end;
  setInputsFromTrim();
});
startTimeInput.addEventListener("input", () => setTrimFromInputs());
startTimeInput.addEventListener("change", () => setTrimFromInputs());
endTimeInput.addEventListener("input", () => setTrimFromInputs());
endTimeInput.addEventListener("change", () => setTrimFromInputs());

widthSlider.addEventListener("input", () => {
  widthValue.textContent = widthSlider.value;
});

convertBtn.addEventListener("click", async () => {
  if (!selectedFile) return;
  hideMessage();
  convertBtn.disabled = true;
  convertBtn.textContent = "Converting…";

  try {
    const settings = {
      width: parseInt(document.getElementById("width").value, 10),
      fps: parseInt(document.getElementById("fps").value, 10),
      quality: document.getElementById("quality").value,
      loop: document.getElementById("loop").checked,
      startTime: startTimeInput.value || "0",
      endTime: endTimeInput.value.trim() || undefined,
    };

    const bytes = await convertVideoToGif(selectedFile, settings);
    const blob = new Blob([bytes], { type: "image/gif" });
    const url = URL.createObjectURL(blob);
    const name = selectedFile.name.replace(/\.[^.]+$/, "") + ".gif";

    preview.src = url;
    downloadLink.href = url;
    downloadLink.download = name;
    result.classList.remove("hidden");
    showMessage("GIF ready. Download or copy below.", "success");
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : typeof err === "string" ? err : err?.message || String(err);
    showMessage(msg || "Conversion failed.", "error");
  } finally {
    convertBtn.disabled = false;
    convertBtn.textContent = "Convert to GIF";
  }
});

copyBtn.addEventListener("click", async () => {
  if (!preview.src) return;
  try {
    const res = await fetch(preview.src);
    const blob = await res.blob();
    await navigator.clipboard.write([new ClipboardItem({ "image/gif": blob })]);
    showMessage("GIF copied to clipboard.", "success");
  } catch {
    showMessage("Copy failed. Use Download instead.", "error");
  }
});
