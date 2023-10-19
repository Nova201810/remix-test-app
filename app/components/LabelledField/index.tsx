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
} & Omit<HTMLProps<HTMLInputElement>, 'name'>;

export default function LabelledField({ name, label, field, type, ...inputProps }: Props) {
  const { updateField } = useFieldUpdate(inputProps.onChange);
  const hasError = !!field?.error;

  return (
    <label className="LabelledField">
      <div className="LabelledField__Label">{label}</div>
      {hasError && (
        <div className="LabelledField__Error">{field.error}</div>
      )}
      <input
        className={cn(
          'LabelledField__Input',
          { 'LabelledField__Input_Date': type === 'date' },
          { 'LabelledField__Input--error': hasError },
        )}
        name={name}
        defaultValue={field?.value as string}
        type={type}
        {...inputProps}
        onChange={updateField}
      />
    </label>
  );
}