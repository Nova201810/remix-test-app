import { FormFieldData, FormFields } from "~/@types/form";
import LabelledFieldset from "~/components/LabelledFieldset";
import LabelledRadio from "~/components/LabelledRadio";
import { useFieldUpdate } from "~/hooks/useFieldUpdate";

type Props = {
  field: FormFieldData<FormFields.PERIOD>;
};

const PERIODS = [
  { label: '9:00 - 14:00', value: '9-14' },
  { label: '14:00 - 19:00', value: '14-19' },
  { label: '9:00 - 19:00', value: '9-19' },
];

export default function PeriodFieldset({ field }: Props) {
  const { error, updateField } = useFieldUpdate({ initError: field?.error });
  const modifiedField = { value: field?.value, error };

  return (
    <LabelledFieldset legend="Период" error={error}>
      {PERIODS.map(({ label, value }) => (
        <LabelledRadio
          key={label}
          name="period"
          label={label}
          value={value}
          onChange={updateField}
          field={modifiedField}
        />
      ))}
    </LabelledFieldset>
  );
}