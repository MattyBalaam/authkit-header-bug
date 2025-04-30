import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Form, useLoaderData } from "@remix-run/react";
import { jsonWithSuccess } from "remix-toast";
import { getWorkOsData } from "~/util/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await getWorkOsData(request);

  return {
    firstName: user?.firstName,
  };
};

export const action = () => {
  return jsonWithSuccess(
    {},
    "Action was successful on child at " + new Date().toISOString(),
  );
};

export default function Index() {
  const { firstName } = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Child</h2>
      <p>{JSON.stringify({ firstName })}</p>

      <Form method="POST">
        <button type="submit">Click this to do an action</button>
      </Form>

      <Link to="/another-child-with-multiple-loaders">
        Toast message should disappear after navigation
      </Link>
    </main>
  );
}
