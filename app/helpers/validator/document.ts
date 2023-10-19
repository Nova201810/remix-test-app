import { FormFields, FieldsValues } from "~/@types/form";

const documentNumberValidator = (documentNumber: FieldsValues[FormFields.DOCUMENT_NUMBER]) => {
  const errorText = 'Введите номер документа в формате 99999-99';
  if (!documentNumber) return errorText;
  const documentNumberRegexp = /^\d{5}-?\d{2}$/i;
  const isValid = documentNumberRegexp.test(documentNumber);
  if (!isValid) {
    return errorText;
  };
  return false;
};

const documentValidator = (document: FieldsValues[FormFields.DOCUMENT]) => {
  if (!document?.length) return 'Добавьте сертификат';
  return false;
};

export const stepDocumentValidator = {
  [FormFields.DOCUMENT_NUMBER]: documentNumberValidator,
  [FormFields.DOCUMENT]: documentValidator,
};