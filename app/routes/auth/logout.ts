import type { LoaderFunctionArgs } from '@remix-run/node';
import { signOut } from '@workos-inc/authkit-remix';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await signOut(request);
};
