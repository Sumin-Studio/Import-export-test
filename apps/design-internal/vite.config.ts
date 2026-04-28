import fs from "node:fs";
import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    reactRouter(),
    {
      name: "apps-json-middleware",
      configureServer(server) {
        server.middlewares.use("/apps.json", (_req, res) => {
          const override = path.resolve(__dirname, "public/apps.json");
          const root = path.resolve(__dirname, "../../apps.json");
          const source = fs.existsSync(override) ? override : root;
          res.setHeader("Content-Type", "application/json");
          res.end(fs.readFileSync(source, "utf-8"));
        });
      },
    },
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
    },
  },
});
