import { stepIntroValidator } from "./stepIntroValidator";

export const validator = {
  1: stepIntroValidator,
};

export const validateForm = (step: number, values: Record<string, FormDataEntryValue>) => {
  const stepValidator = validator[step as keyof typeof validator] ?? {};
  let errors: Record<string, string> = {};
  Object.keys(stepValidator).forEach(field => {
    const fieldValidator = stepValidator && stepValidator[field as keyof typeof stepValidator];
    const fieldValue = values[field];
    const validationError = fieldValidator && fieldValidator(fieldValue);
    if (validationError) {
      errors[field] = validationError;
    }
  });
  return Object.values(errors).length > 0 ? errors : null;
};