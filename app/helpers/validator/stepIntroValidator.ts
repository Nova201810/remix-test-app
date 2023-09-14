const userValidator = (user: FormDataEntryValue) => {
  if (!user) return 'Введите ФИО';
  const userPattern = /^[а-яё\s]*$/i;
  const isValidUser = userPattern.test(user as string);
  if (!isValidUser) {
    return 'ФИО должно содержать только кириллицу и пробелы'
  };
  return false;
};

export const stepIntroValidator = {
  user: userValidator,
};