import { useState, useEffect, ChangeEvent, HTMLProps } from "react";
import { useFetcher, useNavigation } from "@remix-run/react";
import cn from 'classnames';

import type { FileInfo, FormFieldData, FormFields } from "~/@types/form";
import Spinner from "~/components/icons/Spinner";
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
  const navigation = useNavigation();
  const files = field?.value as FileInfo<'saved' | 'unsaved'>[];
  const fetcher = useFetcher();
  const initError = field?.error;
  const [error, setError] = useState(initError);

  useEffect(() => {
    if (navigation.state === 'idle') {
      setError(initError);
    }
  }, [navigation.state]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
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

  const filesLoading = fetcher.state !== 'idle';
  const hasFiles = !!files?.length;
  const showInfo = filesLoading || hasFiles;

  return (
    <Stack space="m" className="FileUploader">
      <label>
        <div className="FileUploader__Label">{label}</div>
        {error && (
          <div className="FileUploader__Error">{error}</div>
        )}
        <input
          className={cn(
            'FileUploader__Input',
            { 'FileUploader__Input--error': error },
          )}
          name={name}
          type="file"
          {...inputProps}
          onChange={onChange}
        />
      </label>
      {showInfo && (
        <Stack space="s">
          <b>Загруженные файлы:</b>
          {filesLoading && (
            <Spinner className="FileUploader__Spinner" />
          )}
          {!filesLoading && (
            files.map(file => (
              <SavedFile key={file.name} {...file} />
            ))
          )}
        </Stack>
      )}
    </Stack>
  );
}