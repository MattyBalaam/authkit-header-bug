import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getWorkOsData } from "~/util/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await getWorkOsData(request);

  return null;
};

export default function Index() {
  return (
    <nav>
      <Link to="/child-with-multiple-loaders">Go to this route</Link>
    </nav>
  );
}
