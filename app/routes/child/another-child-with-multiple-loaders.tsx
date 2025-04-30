import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authkitLoader } from "@workos-inc/authkit-remix";
import { jsonWithSuccess } from "remix-toast";

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

export const action = () => {
  return jsonWithSuccess(
    {},
    "Action was successful on another child at " + new Date().toISOString(),
  );
};

export default function Index() {
  const { lastName } = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Another child</h2>
      <p>{JSON.stringify({ lastName })}</p>

      <Form method="POST">
        <button type="submit">Click this to do an action</button>
      </Form>

      <Link to="/child-with-multiple-loaders">
        Toast message should disappear after navigation
      </Link>
    </main>
  );
}
