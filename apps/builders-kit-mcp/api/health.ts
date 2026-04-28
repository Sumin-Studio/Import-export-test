import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.json({
    status: "ok",
    server: "builders-kit-mcp",
    version: "0.1.0",
  });
}
