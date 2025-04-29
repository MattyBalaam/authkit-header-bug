import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { authkitLoader } from "@workos-inc/authkit-remix";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1])).exp;
  } catch (e) {
    return null;
  }
};

export const loader = (args: LoaderFunctionArgs) =>
  authkitLoader(args, async ({ auth }) => {

    console.log("Root. " + new Date().toISOString() +" Access Token end:", auth?.accessToken?.slice(-10));

    console.log('expires at ' + new Date(parseJwt(auth.accessToken) * 1000).toISOString())

    return {
      data: auth.user?.firstName,
    };
  }, { ensureSignedIn: true });

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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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
