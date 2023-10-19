import type { ReactNode } from "react";
import cn from "classnames";

import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type Props = {
  children: ReactNode;
  className?: string;
  size: 's' | 'm' | 'l';
};

export default function Island({ children, size, className }: Props) {
  return (
    <div className={cn('Island', { [`Island--size-${size}`]: true }, className)}>
      {children}
    </div>
  );
}