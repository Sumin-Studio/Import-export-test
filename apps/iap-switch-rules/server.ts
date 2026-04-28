const server = Bun.serve({
  port: 3002,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = Bun.file(import.meta.dir + path);
    if (await file.exists()) {
      return new Response(file, {
        headers: { "Content-Type": getContentType(path) },
      });
    }
    return new Response("Not found", { status: 404 });
  },
});

function getContentType(path: string): string {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".ico")) return "image/x-icon";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

console.log(`Server running at http://localhost:${server.port}`);
