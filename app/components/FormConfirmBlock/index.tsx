import Button from "../Button";
import Stack from "../Stack";
import { STEPS } from "~/constants/form";
import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type Props = {
  step: Exclude<typeof STEPS[number], 0>;
  content: { label: string, data: string }[],
};

export default function FormConfirmBlock({ step, content }: Props) {
  return (
    <div className="FormConfirmBlock">
      <Stack space="m" className="FormConfirmBlock__Content">
        {content.map(({ label, data }) => (
          <div key={label}>
            <b>{label}</b>
            <div>{data}</div>
          </div>
        ))}
      </Stack>
      <div>
        <Button kind="borderless" as="a" to={`/form/${step}`}>
          Изменить
        </Button>
      </div>
    </div>
  );
}