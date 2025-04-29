import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authkitLoader } from "@workos-inc/authkit-remix";

export const loader = (args: LoaderFunctionArgs) =>
  authkitLoader(
    args,
    async ({ auth }) => {
      console.log("Access Token end:", auth?.accessToken?.slice(-10));

      return {
        email: auth.user?.email,
      };
    },
    { ensureSignedIn: true },
  );

export default function Index() {
  const { email } = useLoaderData<typeof loader>();

  return (
    <main>
      <p>{email}</p>
      <Outlet />
    </main>
  );
}
