import { FormFields, FieldsValues } from "~/@types/form";

const userValidator = (user: FieldsValues[FormFields.USER]) => {
  if (!user) return 'Введите ФИО';
  const userRegexp = /^[а-яё\s]*$/i;
  const isValid = userRegexp.test(user);
  if (!isValid) {
    return 'ФИО должно содержать только кириллицу и пробелы';
  };
  return false;
};

const phoneValidator = (phone: FieldsValues[FormFields.PHONE]) => {
  if (!phone) return 'Введите номер телефона';
  const phoneRegexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const isValid = phoneRegexp.test(phone);
  if (!isValid) {
    return 'Введите номер телефона в правильном формате. Например, +7(999)999-99-99';
  };
  return false;
};

export const stepUserValidator = {
  [FormFields.USER]: userValidator,
  [FormFields.PHONE]: phoneValidator,
};