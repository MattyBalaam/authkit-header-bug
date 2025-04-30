import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { jsonWithSuccess } from "remix-toast";
import { getWorkOsData } from "~/util/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await getWorkOsData(request);

  return {
    lastName: user?.lastName,
  };
};

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
