import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { Params, useLoaderData } from "@remix-run/react";

import { getSession, commitSession, destroySession } from '~/sessions';
import Step from "~/components/Step";
import { validateForm } from "~/helpers/validator";

type FormField = { value: FormDataEntryValue, error: string | boolean };
const fieldsKey = "fields";
const STEPS = [0, 1, 2, 3, 4] as const;
const getStep = (params: Params) => (params.step ? +params.step : 0) as typeof STEPS[number];;

export async function loader({ params, request }: LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  const step = getStep(params);
  const isValidStep = STEPS.includes(step);

  if (!isValidStep) {
    throw json("Not Found", { status: 404 });
  }

  const savedFields = session.get(fieldsKey) ?? {};
  return json(
    { step, fields: savedFields },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

export async function action({ request, params }: ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const step = getStep(params);
  const formData = await request.formData();
  const fieldsValues = Object.fromEntries(formData);
  console.log({fieldsValues})
  const savedFields = session.get(fieldsKey) ?? {};

  const validationErrors = validateForm(step, fieldsValues);
  console.log({validationErrors})
  const fields: Record<string, FormField> = Object.keys(fieldsValues).reduce((fields, currentField) => ({
    ...fields,
    [currentField]: {
      value: fieldsValues[currentField],
      error: validationErrors ? (validationErrors[currentField] ?? false) : false,
    }
  }), {});
  const updatedFields = { ...savedFields, ...fields };
  session.set(fieldsKey, updatedFields);
  if (validationErrors) {
    return json(null, { headers: { "Set-Cookie": await commitSession(session) } });
  }

  const isLastStep = STEPS.indexOf(step) === STEPS.length - 1;
  const redirectUrl = isLastStep ? '/success' : `/new/${step + 1}`;
  const sessionAction = isLastStep ? destroySession : commitSession;
  return redirect(
    redirectUrl,
    { headers: { "Set-Cookie": await sessionAction(session) } },
  );
}

export default function Form() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Форма подачи заявки</h1>
      <Step />
    </div>
  );
}
