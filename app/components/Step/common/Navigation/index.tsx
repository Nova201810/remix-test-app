import { NavLink, useNavigation } from "@remix-run/react";

export default function Navigation({ step }: { step: 0 | 1 | 2 | 3 | 4 }) {
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