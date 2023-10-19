import { useLoaderData } from "@remix-run/react";

import { loader } from "~/routes/form.($step)";
import LabelledField from "~/components/LabelledField";
import LabelledFieldset from "~/components/LabelledFieldset";
import LabelledRadio from "~/components/LabelledRadio";
import Stack from "~/components/Stack";
import { FormFields } from "~/@types/form";

export default function StepDate() {
  const { fields } = useLoaderData<typeof loader>() as any;

  return (
    <Stack space="l">
      <LabelledField name="date" label="Дата" type="date" field={fields[FormFields.DATE]} />
      <LabelledFieldset legend="Период" error={fields[FormFields.PERIOD]?.error}>
        <LabelledRadio name="period" label="9:00 - 14:00" value="9-14" field={fields[FormFields.PERIOD]} />
        <LabelledRadio name="period" label="14:00 - 19:00" value="14-19" field={fields[FormFields.PERIOD]} />
        <LabelledRadio name="period" label="9:00 - 19:00" value="9-19" field={fields[FormFields.PERIOD]} />
      </LabelledFieldset>
    </Stack>
  );
}