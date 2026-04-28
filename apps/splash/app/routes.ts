import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("/go/*", "routes/home.tsx", { id: "go-redirect" }),
] satisfies RouteConfig;
