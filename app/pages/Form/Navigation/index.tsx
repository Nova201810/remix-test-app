import { useNavigation } from "@remix-run/react";

import Button from "~/components/Button";
import { STEPS } from "~/constants/form";
import { PAGES, getRoute } from "~/helpers/getRoute";
import styles from './styles.css';

export const links = () => [
  { rel: "stylesheet", href: styles },
];

export default function Navigation({ step }: { step: typeof STEPS[number] }) {
  const navigation = useNavigation();
  const isLoading = navigation.state !== 'idle';

  return (
    <div className="Navigation">
      {step !== 0 && (
        <Button kind="secondary" as="a" to={getRoute(PAGES.FORM, step - 1)} replace className="Navigation__Back">
          Назад
        </Button>
      )}
      <Button kind="primary" type="submit" loading={isLoading}>
        Продолжить
      </Button>
    </div>
  );
}