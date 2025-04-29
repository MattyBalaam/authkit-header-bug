import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@remix-run/route-config";

const routes = [
  route("logout", "routes/auth/logout.ts"),
  route("callback", "routes/auth/callback.ts"),
  layout("routes/layout.tsx", [
    index("routes/index.tsx"),
    layout("routes/child/layout.tsx", [
      route(
        "/child-with-multiple-loaders",
        "routes/child/child-with-multiple-loaders.tsx",
      ),
      route(
        "/another-child-with-multiple-loaders",
        "routes/child/another-child-with-multiple-loaders.tsx",
      ),
    ]),
  ]),
] satisfies RouteConfig;

export default routes;
