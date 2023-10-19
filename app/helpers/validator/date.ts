import { FormFields, FieldsValues } from "~/@types/form";

const dateValidator = (date: FieldsValues[FormFields.DATE]) => {
  if (!date) return 'Выберите дату';
  return false;
};

const periodValidator = (period: FieldsValues[FormFields.PERIOD]) => {
  if (!period) return 'Выберите период';
  return false;
};

export const stepDateValidator = {
  [FormFields.DATE]: dateValidator,
  [FormFields.PERIOD]: periodValidator,
};