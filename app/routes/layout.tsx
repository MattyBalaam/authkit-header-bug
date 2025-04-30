import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getWorkOsData } from "~/util/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await getWorkOsData(request);

  return user;
};

export default function Index() {
  return (
    <main>
      <h1>Some app</h1>
      <Outlet />
    </main>
  );
}
