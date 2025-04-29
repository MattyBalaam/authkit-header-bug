import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getWorkOsSession } from "~/util/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await getWorkOsSession(request);

  return { firstName: user.firstName };
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Child</h2>
      <p>{JSON.stringify(loaderData)}</p>
      <Outlet />

      <Link to="/another-child-with-multiple-loaders">
        Keep switching routes until session expires
      </Link>
    </main>
  );
}
