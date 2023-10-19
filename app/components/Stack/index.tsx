import type { ReactNode } from "react";
import cn from 'classnames';

import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type Props = {
  children: ReactNode;
  className?: string;
  space: 's' | 'm' | 'l' | 'xl';
};

export default function Stack({ children, space, className }: Props) {
  return (
    <div className={cn('Stack', { [`Stack--size-${space}`]: true }, className)}>
      {children}
    </div>
  );
}