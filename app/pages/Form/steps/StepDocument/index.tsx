import { useLoaderData } from "@remix-run/react";

import LabelledField from "~/components/LabelledField";
import Stack from "~/components/Stack";
import { FormFields } from "~/@types/form";
import { loader } from "~/routes/form.($step)";
import FileUploader from "~/components/FileUploader";

export default function StepDocument() {
  const { fields } = useLoaderData<typeof loader>() as any;

  return (
    <Stack space="l">
      <LabelledField name="document_number" label="Номер документа" field={fields[FormFields.DOCUMENT_NUMBER]} />
      <FileUploader field={fields[FormFields.DOCUMENT]} name="document" multiple label="Сертификат" />
    </Stack>
  );
}