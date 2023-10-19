import { ChangeEvent, HTMLProps } from "react";
import { useFetcher } from "@remix-run/react";
import cn from 'classnames';

import type { FileInfo, FormFieldData, FormFields } from "~/@types/form";
import Stack from "../Stack";
import SavedFile, { links as savedFileLinks } from "./SavedFile";
import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...savedFileLinks(),
];

type Props = {
  name: string;
  label: string
  field: FormFieldData<FormFields.DOCUMENT>;
} & Omit<HTMLProps<HTMLInputElement>, 'name' | 'type'>;

export default function FileUploader({ name, label, field, ...inputProps }: Props) {
  const files = field?.value as FileInfo<'saved' | 'unsaved'>[];
  const fetcher = useFetcher();
  const hasError = !!field?.error;
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputProps.onChange) {
      inputProps.onChange(event);
    }
    const { files: newFiles } = event.target;
    const formData = new FormData();
    if (files) {
      files.forEach(file => {
        formData.append(name, JSON.stringify(file));
      });
    }
    if (newFiles) {
      Object.values(newFiles).forEach(file => {
        formData.append(name, file);
      });
    }
    fetcher.submit(formData, { method: "PUT", encType: "multipart/form-data" });
  };

  return (
    <Stack space="m" className="FileUploader">
      <label>
        <div className="FileUploader__Label">{label}</div>
        {hasError && (
          <div className="FileUploader__Error">{field.error}</div>
        )}
        <input
          className={cn(
            'FileUploader__Input',
            { 'FileUploader__Input--error': hasError },
          )}
          name={name}
          type="file"
          {...inputProps}
          onChange={onChange}
        />
      </label>
      {!!files?.length && (
        <Stack space="s">
          <b>Загруженные файлы:</b>
          {files.map(file => (
            <SavedFile key={file.name} {...file} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}