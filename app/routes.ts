import {
  type RouteConfig,
  index,
  route,
} from "@remix-run/route-config";

const routes = [
  route("logout", "routes/auth/logout.tsx"),
  route("callback", "routes/auth/callback.tsx"),
  index("routes/index.tsx"),
] satisfies RouteConfig;

export default routes;
