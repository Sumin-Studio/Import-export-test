#!/usr/bin/env node
/**
 * Picks the first free port starting at PORT (default 3000) and runs `next dev`.
 * Avoids EADDRINUSE when another app (or a stuck Next process) already uses 3000.
 */
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

const MAX_TRIES = 30;
const startPort = Number.parseInt(process.env.PORT ?? "3000", 10);

function tryPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", (err) => {
      if (/** @type {NodeJS.ErrnoException} */ (err).code === "EADDRINUSE") {
        resolve(null);
      } else {
        reject(err);
      }
    });
    /** Match `next dev` default bind (`0.0.0.0`) so we don’t think a port is free when only the other address family is in use. */
    server.listen(port, "0.0.0.0", () => {
      const addr = server.address();
      const p = typeof addr === "object" && addr ? addr.port : port;
      server.close(() => resolve(p));
    });
  });
}

async function findFreePort() {
  for (let i = 0; i < MAX_TRIES; i++) {
    const p = startPort + i;
    const ok = await tryPort(p);
    if (ok !== null) {
      if (p !== startPort) {
        process.stderr.write(
          `[dev] Port ${startPort} is in use; starting on http://localhost:${ok} instead.\n`,
        );
      }
      return ok;
    }
  }
  throw new Error(
    `No free port found between ${startPort} and ${startPort + MAX_TRIES - 1}.`,
  );
}

const port = await findFreePort();
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");

const extraArgs = process.argv.slice(2);
const child = spawn(
  process.execPath,
  [nextBin, "dev", "-p", String(port), ...extraArgs],
  {
    cwd: projectRoot,
    stdio: "inherit",
    env: { ...process.env, PORT: String(port) },
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 1);
  }
});
