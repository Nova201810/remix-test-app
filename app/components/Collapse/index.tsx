import type { ReactNode } from "react";
import { Link, useSearchParams } from "@remix-run/react";

import styles from './styles.css';

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type Props = {
  title: string;
  paramKey: string;
  children: ReactNode;
};

export default function Collapse({ title, paramKey, children }: Props) {
  const [searchParams] = useSearchParams();
  const TRUE = 'true';
  const isVisible = searchParams.get(paramKey) === TRUE;
  if (isVisible) {
    searchParams.delete(paramKey);
  } else {
    searchParams.append(paramKey, TRUE);
  }
  const newQueryString = `?${searchParams.toString()}`;

  return (
    <div className="Collapse">
      <Link to={newQueryString} preventScrollReset className="Collapse__Button">{title}</Link>
      {isVisible && (
        <div className="Collapse__Content">{children}</div>
      )}
    </div>
  );
}