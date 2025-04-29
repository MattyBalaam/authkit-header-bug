import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { authkitLoader } from "@workos-inc/authkit-remix";

export const loader = (args: LoaderFunctionArgs) =>
  authkitLoader(
    args,
    async ({ auth }) => {
      console.log("Access Token end:", auth?.accessToken?.slice(-10));

      return {
        lastName: auth.user?.lastName,
      };
    },
    { ensureSignedIn: true },
  );

export default function Index() {
  const {lastName} = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Another child</h2>
      <p>{JSON.stringify({lastName})}</p>
      <Outlet />

      <Link to="/child-with-multiple-loaders">
        Keep switching routes until session expires
      </Link>
    </main>
  );
}
