import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getWorkOsData } from "~/util/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await getWorkOsData(request);

  return {
    email: user?.email,
  };
};

export default function Index() {
  const { email } = useLoaderData<typeof loader>();

  return (
    <main>
      <p>{email}</p>
      <Outlet />
    </main>
  );
}
