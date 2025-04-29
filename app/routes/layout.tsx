import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authkitLoader } from "@workos-inc/authkit-remix";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = (args: LoaderFunctionArgs) =>
  authkitLoader(
    args,
    async ({ auth }) => {
      console.log("Access Token end:", auth?.accessToken?.slice(-10));

      return {
        user: auth.user?.firstName,
      };
    },
    { ensureSignedIn: true },
  );

export default function Index() {
  return (
    <main>
      <h1>Some app</h1>
      <Outlet />
    </main>
  );
}
