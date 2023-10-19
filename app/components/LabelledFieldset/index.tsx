import { HTMLProps } from "react";
import cn from 'classnames';

import { FormFieldData, FormFields } from "~/@types/form";
import Stack from "../Stack";
import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type Props = {
  legend: string;
  error?: FormFieldData<FormFields>['error'];
} & HTMLProps<HTMLFieldSetElement>;

export default function LabelledFieldset({ legend, error, className, children, ...fieldsetProps }: Props) {
  return (
    <fieldset {...fieldsetProps} className={cn("LabelledFieldset", className)}>
      <legend className="LabelledFieldset__Legend">
        {legend}
        {!!error && <div className="LabelledFieldset__Legend_Error">{error}</div>}
      </legend>
      <Stack space="s" className="LabelledFieldset__Fields">
        {children}
      </Stack>
    </fieldset>
  );
}