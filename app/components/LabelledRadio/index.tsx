import { HTMLProps } from "react";
import type { FormFieldData, FormFields } from "~/@types/form";
import cn from 'classnames';

import { useFieldUpdate } from "~/hooks/useFieldUpdate";
import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type Props = {
  name: string;
  label: string
  field: FormFieldData<Exclude<FormFields, FormFields.DOCUMENT>>;
} & Omit<HTMLProps<HTMLInputElement>, 'name' | 'type'>;

export default function LabelledRadio({ name, label, field, ...inputProps }: Props) {
  return (
    <label className="LabelledRadio">
      <input
        className={cn(
          'LabelledRadio__Input',
          { 'LabelledRadio__Input--error': !!field?.error },
        )}
        name={name}
        type="radio"
        defaultChecked={field?.value === inputProps?.value}
        {...inputProps}
      />
      <div className="LabelledRadio__Label">{label}</div>
    </label>
  );
}