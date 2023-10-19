import { LinksFunction } from "@remix-run/node";

import IndexContent, { links as indexLinks } from "~/pages/Index";

export const links: LinksFunction = () => [
  ...indexLinks(),
];

export default function Index() {
  return (
    <IndexContent />
  );
}
