import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { authkitLoader } from "@workos-inc/authkit-remix";

export const loader = (args: LoaderFunctionArgs) =>
  authkitLoader(
    args,
    async ({ auth }) => {
      console.log("Access Token end:", auth?.accessToken?.slice(-10));

      return {
        firstName: auth.user?.firstName,
      };
    },
    { ensureSignedIn: true },
  );

export default function Index() {
  const {firstName} = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Child</h2>
      <p>{JSON.stringify({firstName})}</p>
      <Outlet />

      <Link to="/another-child-with-multiple-loaders">
        Keep switching routes until session expires
      </Link>
    </main>
  );
}
