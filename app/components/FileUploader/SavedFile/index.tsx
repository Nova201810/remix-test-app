import { Link, useSearchParams } from "@remix-run/react";
import cn from "classnames";

import styles from "./styles.css";
import { FileInfo } from "~/@types/form";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

export default function SavedFile({ name, id }: FileInfo<'saved' | 'unsaved'>) {
  const [searchParams] = useSearchParams();

  if (!id) {
    return null;
  }

  const TRUE = 'true';
  const shouldRecover = searchParams.get(id) === TRUE;
  if (shouldRecover) {
    searchParams.delete(id);
  } else {
    searchParams.append(id, TRUE);
  }
  const newQueryString = `?${searchParams.toString()}`;
  const buttonContent = shouldRecover ? 'Восстановить' : 'Удалить';
  const buttonType = shouldRecover ? 'Recover' : 'Delete';

  return (
    <div className="SavedFile">
      <div className="SavedFile__Name">{name}</div>
      <Link
        className={cn('SavedFile__Button', `SavedFile__Button-${buttonType}`)}
        to={newQueryString}
        preventScrollReset
      >
        {buttonContent}
      </Link>
    </div>
  );
}