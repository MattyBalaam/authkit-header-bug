import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Form, useLoaderData } from "@remix-run/react";
import { authkitLoader } from "@workos-inc/authkit-remix";
import { jsonWithSuccess } from "remix-toast";

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


  export const action = () => {
    return jsonWithSuccess({}, 'Action was successful on child at ' + new Date().toISOString());
  }

export default function Index() {
  const {firstName} = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Child</h2>
      <p>{JSON.stringify({firstName})}</p>



      <Form method="POST">
        <button type="submit">Click this to do an action</button>
      </Form>

      <Link to="/another-child-with-multiple-loaders">
      Toast message should disappear after navigation
      </Link>
    </main>
  );
}
