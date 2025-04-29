import { authLoader } from "@workos-inc/authkit-remix";
import type { LoaderFunctionArgs } from "react-router-dom";

const callback = authLoader({
  onSuccess: (data) => {
    console.log("WorkOS callback success", data);
  },
});

// callback URL to redirect users back to after they've authenticated, can be configured in the WorkOS dashboard
// if not set, the user will be redirected to root unless returnPathname option is passed to the authLoader
export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  try {
    return await callback({ request, params, context });
  } catch (thrown) {
    console.error("WorkOS callback error", thrown);
    throw thrown;
  }
};
