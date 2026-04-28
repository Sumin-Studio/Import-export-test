import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/prototypes.tsx"),
    // TODO: future page — uncomment and create the route file
    // route("settings", "routes/settings.tsx"),
  ]),
] satisfies RouteConfig;
