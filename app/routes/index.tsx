import type { LoaderFunctionArgs } from "@remix-run/node";
import { withAuth } from "@workos-inc/authkit-remix";

export const loader = async ({ request }: LoaderFunctionArgs) => {

  console.log('./index loader')

  const user = await withAuth({ request, params: {}, context: {} });

  console.log('./index got user', user)

  return null;
};

export default function Index() {
  return (
    <p>hello</p>
  );
}
