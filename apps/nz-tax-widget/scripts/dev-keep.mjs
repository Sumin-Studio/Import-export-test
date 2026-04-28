import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(appRoot, "node_modules", "next", "dist", "bin", "next");
const extraArgs = process.argv.slice(2);
const nextArgs = ["dev", "--turbopack", ...extraArgs];

const memMb = process.env.NZTAX_DEV_MEMORY_MB || "6144";
if (!/\bmax-old-space-size=/.test(process.env.NODE_OPTIONS ?? "")) {
  process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, `--max-old-space-size=${memMb}`]
    .filter(Boolean)
    .join(" ");
}

function start() {
  const child = spawn(process.execPath, [nextBin, ...nextArgs], {
    cwd: appRoot,
    stdio: "inherit",
    env: process.env,
  });

  const forward = (signal) => {
    if (!child.killed) child.kill(signal);
  };
  const onSigInt = () => forward("SIGINT");
  const onSigTerm = () => forward("SIGTERM");
  process.on("SIGINT", onSigInt);
  process.on("SIGTERM", onSigTerm);

  child.on("exit", (code, signal) => {
    process.removeListener("SIGINT", onSigInt);
    process.removeListener("SIGTERM", onSigTerm);

    if (signal) {
      if (signal === "SIGINT" || signal === "SIGTERM") {
        process.exit(code ?? 0);
      }
      // SIGKILL, SIGHUP, etc. (OOM, host teardown): do not spin a restart loop.
      console.error(`\n[dev] Next.js ended with signal ${signal}; exiting.\n`);
      process.exit(code ?? 1);
    }

    if (code === 0) {
      process.exit(0);
    }

    console.error(
      `\n[dev] Next.js exited (code ${code}). Restarting in 2s… (Ctrl+C to stop)\n`
    );
    setTimeout(start, 2000);
  });
}

start();
