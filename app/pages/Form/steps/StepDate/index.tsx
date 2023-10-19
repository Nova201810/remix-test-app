import { useLoaderData } from "@remix-run/react";

import { loader } from "~/routes/form.($step)";
import LabelledField from "~/components/LabelledField";
import Stack from "~/components/Stack";
import PeriodFieldset from "./PeriodFieldset";
import { FormFields } from "~/@types/form";

export default function StepDate() {
  const { fields } = useLoaderData<typeof loader>() as any;

  return (
    <Stack space="l">
      <LabelledField name="date" label="Дата" type="date" field={fields[FormFields.DATE]} />
      <PeriodFieldset field={fields[FormFields.PERIOD]} />
    </Stack>
  );
}