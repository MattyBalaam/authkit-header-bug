import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getWorkOsSession } from "~/util/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await getWorkOsSession(request);

  return { user };
};

export default function Index() {
  return (
    <nav>
      <Link to="/child-with-multiple-loaders">Go to this route</Link>
    </nav>
  );
}
