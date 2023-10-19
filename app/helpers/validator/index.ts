import { FormFields, FieldsValues, FormData } from "~/@types/form";
import { stepUserValidator } from "./user";
import { stepDocumentValidator } from "./document";
import { stepDateValidator } from "./date";

export const validator = {
  1: stepUserValidator,
  2: stepDocumentValidator,
  3: stepDateValidator,
};

export const validateForm = (step: number, values: FormData) => {
  const stepValidator = validator[step as keyof typeof validator];
  let errors: Record<string, string> = {};
  if (stepValidator) {
    Object.keys(stepValidator).forEach(field => {
      const fieldValidator = stepValidator && stepValidator[field as keyof typeof stepValidator];
      const fieldValue = values[field as FormFields]?.value as FieldsValues[FormFields];
      // @ts-expect-error
      const validationError = fieldValidator && fieldValidator(fieldValue);
      if (validationError) {
        errors[field] = validationError;
      }
    });
  }
  return Object.values(errors).length > 0 ? errors : null;
};