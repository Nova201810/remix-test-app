import { NavLink, useNavigation } from "@remix-run/react";

import { STEPS } from "~/constants/form";

export default function Navigation({ step }: { step: typeof STEPS[number] }) {
  const navigation = useNavigation();

  return (
    <div>
      {step !== 0 && (
        <NavLink to={`/new/${step - 1}`}>
          <span>Назад</span>
        </NavLink>
      )}
      <button type="submit">
        <span className={navigation.state === 'submitting' ? "loading" : ""}>Продолжить</span>
      </button>
    </div>
  );
}