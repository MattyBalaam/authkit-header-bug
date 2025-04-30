import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { authkitLoader } from "@workos-inc/authkit-remix";
import { getToast } from "remix-toast";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1])).exp;
  } catch (e) {
    return null;
  }
};

export const loader = async (args: LoaderFunctionArgs) =>
  authkitLoader(
    args,
    async ({ auth }) => {
      const { toast, headers } = await getToast(args.request);

      console.log(
        "Root. " + new Date().toISOString() + " Access Token end:",
        auth?.accessToken?.slice(-10),
      );

      console.log(
        "expires at " +
          new Date(parseJwt(auth.accessToken) * 1000).toISOString(),
      );

      console.log(toast);

      return data(
        {
     
          toast,
        },
        {
          headers,
        },
      );
    },
    { ensureSignedIn: true },
  );

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const rootData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {rootData?.toast ? (
          <aside style={{background: 'yellow'}}>
            {JSON.stringify(rootData?.toast)} <br />
            [this should only show once, and disappear on navigation]
          </aside>
        ) : null}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
