export type FileInfo<Saved extends 'saved' | 'unsaved' = 'unsaved'> = { name: string; id: Saved extends 'saved' ? string : null };

export enum FormFields {
  USER = 'user',
  PHONE = 'phone',

  DOCUMENT = 'document',
  DOCUMENT_NUMBER = 'document_number',

  DATE = 'date',
  PERIOD = 'period',
};

export type FieldsValues = {
  [FormFields.USER]: string;
  [FormFields.PHONE]: string;

  [FormFields.DOCUMENT]: FileInfo<'saved' | 'unsaved'>[];
  [FormFields.DOCUMENT_NUMBER]: string;

  [FormFields.DATE]: string;
  [FormFields.PERIOD]: string;
}

export type FormFieldData<T extends FormFields> = { value: FieldsValues[T], error: string | boolean };
export type RequestFormData = Record<FormFields, FormDataEntryValue>;
export type FormData = Record<FormFields, FormFieldData<FormFields>>;