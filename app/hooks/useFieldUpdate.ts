import { useState, useEffect, ChangeEvent, HTMLProps } from "react";
import { useNavigation } from "@remix-run/react";

type Props = {
  initError: boolean | string;
  onChange?: HTMLProps<HTMLInputElement>['onChange'];
};

export const useFieldUpdate = ({ initError, onChange }: Props) => {
  const { state } = useNavigation();
  const [error, setError] = useState(initError);

  useEffect(() => {
    if (state === 'idle') {
      setError(initError);
    }
  }, [state]);

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    if (onChange) {
      onChange(event);
    }
  };

  return { error, updateField };
};