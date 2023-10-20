import { ActionArgs, LinksFunction, LoaderArgs, json, redirect } from "@remix-run/node";

import FormContent, { links as formLinks } from "~/pages/Form";
import { validateForm } from "~/helpers/validator";
import { updateFilesState } from "~/api/uploadFile.server";
import { getFormState, updateFormState, deleteFormState } from "~/api/formState.server";
import { FormData, RequestFormData, FormFields } from "~/@types/form";
import { STEPS } from "~/constants/form";
import { submitForm } from "~/api/submitForm.server";
import { getRoute, PAGES } from "~/helpers/getRoute";
import { getStep } from "~/helpers/getStep";
import { MODAL_PARAM_KEY, MODAL_STATE } from "~/constants/errorModal";

export const links: LinksFunction = () => [
  ...formLinks(),
];

export async function loader({ request, params }: LoaderArgs) {
  const step = getStep(params);
  const isValidStep = STEPS.includes(step);
  if (!isValidStep) {
    throw json("Not Found", { status: 404 });
  }

  const referer = request.headers.get('referer');
  const isDirectVisit = !referer && step !== STEPS[0];
  if (isDirectVisit) {
    return redirect(getRoute(PAGES.FORM));
  }

  const { pathname, searchParams } = new URL(request.url);
  const isUpdateModalState = !!searchParams.get(MODAL_PARAM_KEY);
  if (isUpdateModalState) {
    return json({ step, fields: {} as FormData, error: false });
  }

  try {
    let fields = {};
    if (step !== 0) {
      fields = await getFormState();
    }
    return json({ step, fields, error: false });
  } catch {
    searchParams.set(MODAL_PARAM_KEY, MODAL_STATE.VISIBLE);
    return json({ step, fields: {} as FormData, error: true }, {
      status: 307,
      headers: {
        Location: `${pathname}${`?${searchParams.toString()}`}`,
      },
    });
  }
}

export async function action({ request, params }: ActionArgs) {
  const step = getStep(params);
  try {
    const isUpdateOnlyRequest = request.method === 'PUT';
    const formData = await request.formData();
    const fieldsValues = Object.fromEntries(formData) as RequestFormData;
    const fieldDocument = FormFields.DOCUMENT;
    const filesState = await updateFilesState({ files: formData.getAll(fieldDocument).filter(Boolean), request });
    const modifiedFields = Object.keys(fieldsValues).reduce((fields, currentField) => ({ 
      ...fields,
      [currentField]: {
        value: currentField === fieldDocument ? filesState : fieldsValues[currentField as FormFields],
        error: false,
      }
    }), {} as FormData);
    const validationErrors = isUpdateOnlyRequest ? null : validateForm(step, modifiedFields);
    Object.entries(validationErrors ?? {}).forEach(([field, error]) => {
      const currentField = field as keyof typeof modifiedFields;
      modifiedFields[currentField] = { ...modifiedFields[currentField], error };
    });
    await updateFormState(modifiedFields);

    const isUpdateWithoutRedirect = !!validationErrors || isUpdateOnlyRequest;
    if (isUpdateWithoutRedirect) {
      return json(null);
    }

    const isLastStep = STEPS.indexOf(step) === STEPS.length - 1;
    let applicationNumber = null;
    if (isLastStep) {
      const fields = await getFormState();
      const submitFormData = await submitForm(fields);
      applicationNumber = submitFormData.applicationNumber;
      await deleteFormState();
    }
    const redirectUrl = isLastStep ? getRoute(PAGES.SUCCESS, applicationNumber as string) : getRoute(PAGES.FORM, step + 1);
    return redirect(redirectUrl);
  } catch {
    const { pathname, searchParams } = new URL(request.url);
    searchParams.set(MODAL_PARAM_KEY, MODAL_STATE.VISIBLE);
    return redirect(`${pathname}${`?${searchParams.toString()}`}`);
  }
}

export default function Form() {
  return (
    <FormContent />
  );
}
