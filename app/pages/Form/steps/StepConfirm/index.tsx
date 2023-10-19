import { useLoaderData } from "@remix-run/react";

import { loader } from "~/routes/form.($step)";
import LabelledField from "~/components/LabelledField";
import Stack from "~/components/Stack";
import { FormFields } from "~/@types/form";
import FormConfirmBlock from "~/components/FormConfirmBlock";

export default function StepConfirm() {
  const { fields } = useLoaderData<typeof loader>() as any;

  return (
    <Stack space="l">
      <FormConfirmBlock
        step={1}
        content={[
          { label: 'ФИО', data: fields[FormFields.USER]?.value },
          { label: 'Номер телефона', data: fields[FormFields.PHONE]?.value },
        ]}
      />
      <FormConfirmBlock
        step={2}
        content={[
          { label: 'Номер документа', data: fields[FormFields.DOCUMENT_NUMBER]?.value },
          { label: 'Сертификат', data: `Количество файлов: ${fields[FormFields.DOCUMENT]?.value.length}` },
        ]}
      />
      <FormConfirmBlock
        step={3}
        content={[
          { label: 'Дата', data: fields[FormFields.DATE]?.value },
          { label: 'Период', data: fields[FormFields.PERIOD]?.value },
        ]}
      />
    </Stack>
  );
}