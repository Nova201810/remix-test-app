import { useFetcher } from "@remix-run/react";
import { ChangeEvent, HTMLProps } from "react";

export const useFieldUpdate = (baseOnChange: HTMLProps<HTMLInputElement>['onChange']) => {
  //const fetcher = useFetcher()!;
  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    if (baseOnChange) {
      baseOnChange(event);
    }
    //const { value: newValue, name } = event.target;
    //const formData = new FormData();
    //formData.append(name, newValue);
    //fetcher.submit(formData, { method: "PUT", encType: "multipart/form-data" });
  };

  return { updateField };
};