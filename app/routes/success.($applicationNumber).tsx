import { LoaderArgs, json, redirect } from "@remix-run/node";
import { LinksFunction } from "@remix-run/node";

import { PAGES, getRoute } from "~/helpers/getRoute";
import SuccessContent, { links as successLinks } from "~/pages/Success";

export const links: LinksFunction = () => [
  ...successLinks(),
];

export async function loader({ params }: LoaderArgs) {
  const applicationNumber = params.applicationNumber;

  if (!applicationNumber) {
    return redirect(getRoute(PAGES.INDEX));
  }

  return json({ applicationNumber });
}

export default function Success() {
  return (
    <SuccessContent />
  );
}