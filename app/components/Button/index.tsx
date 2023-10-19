import { forwardRef, HTMLProps, ReactNode } from "react";
import { NavLink, NavLinkProps } from "@remix-run/react";
import cn from 'classnames';
import Spinner from '~/components/icons/Spinner';

import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type Props = (
  ({ as?: 'a' } & NavLinkProps) |
  ({ as?: 'button' } & HTMLProps<HTMLButtonElement>)
) & {
  kind: 'primary' | 'secondary' | 'borderless',
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

export default forwardRef(function Button({ as = 'button', kind, loading, children, ...elementProps }: Props, ref) {
  const elementClass = cn('Button', { [`Button--${kind}`]: true }, elementProps.className);
  const Element = as === 'a' ? NavLink : as;

  return (
    <>
      {/* @ts-expect-error */}
      <Element {...elementProps} ref={ref} className={elementClass}>
        {loading ? <Spinner className="Button__Spinner" /> : children}
      </Element>
    </>
  );
})