import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authkitLoader } from "@workos-inc/authkit-remix";

export const loader = (args: LoaderFunctionArgs) =>
  authkitLoader(
    args,
    async ({ auth }) => {
      console.log("Access Token end:", auth?.accessToken?.slice(-10));

      return {
        user: auth.user,
      };
    },
    { ensureSignedIn: true },
  );

export default function Index() {
  return (
    <nav>
      <Link to="/child-with-multiple-loaders">Go to this route</Link>
    </nav>
  );
}
