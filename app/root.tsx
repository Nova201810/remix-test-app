import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalStyles from "~/styles/global.css";
import resetStyles from "~/styles/reset.css";
import ErrorBoundary from "~/components/ErrorBoundary";
import { stylesLinks } from "~/constants/stylesLinks";

export { ErrorBoundary };

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resetStyles },
  { rel: "stylesheet", href: globalStyles },
  ...stylesLinks(),
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Сервис подачи заявления" },
    { name: "description", content: "Сервис позволяет подать заявку" },
  ];
};

export default function App() {
  return (
    <html lang="ru_RU">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
