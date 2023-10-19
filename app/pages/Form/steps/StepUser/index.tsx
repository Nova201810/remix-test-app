import { useLoaderData } from "@remix-run/react";

import { loader } from "~/routes/form.($step)";
import LabelledField from "~/components/LabelledField";
import Stack from "~/components/Stack";
import { FormFields } from "~/@types/form";

export default function StepUser() {
  const { fields } = useLoaderData<typeof loader>() as any;

  return (
    <Stack space="l">
      <LabelledField name="user" label="ФИО" field={fields[FormFields.USER]} />
      <LabelledField name="phone" label="Номер телефона" field={fields[FormFields.PHONE]} />
    </Stack>
  );
}