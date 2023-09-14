import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { Params } from "@remix-run/react";

import Step from "~/components/Step";
import { validateForm } from "~/helpers/validator";
import { getFormState, updateFormState, deleteFormState } from "~/api/formState";
import type { FormField } from "~/@types/form";
import { STEPS } from "~/constants/form";

const getStep = (params: Params) => (params.step ? +params.step : 0) as typeof STEPS[number];

export async function loader({ params }: LoaderArgs) {
  const fields = await getFormState();

  const step = getStep(params);
  const isValidStep = STEPS.includes(step);

  if (!isValidStep) {
    throw json("Not Found", { status: 404 });
  }

  return json({ step, fields });
}

export async function action({ request, params }: ActionArgs) {
  const step = getStep(params);
  const formData = await request.formData();
  const fieldsValues = Object.fromEntries(formData);

  const validationErrors = validateForm(step, fieldsValues);
  const fields: Record<string, FormField> = Object.keys(fieldsValues).reduce((fields, currentField) => ({
    ...fields,
    [currentField]: {
      value: fieldsValues[currentField],
      error: validationErrors ? (validationErrors[currentField] ?? false) : false,
    }
  }), {});

  await updateFormState(fields);

  if (validationErrors) {
    return json(null);
  }

  const isLastStep = STEPS.indexOf(step) === STEPS.length - 1;
  if (isLastStep) {
    await deleteFormState();
  }

  const redirectUrl = isLastStep ? '/success' : `/new/${step + 1}`;
  return redirect(redirectUrl);
}

export default function Form() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Форма подачи заявки</h1>
      <Step />
    </div>
  );
}
