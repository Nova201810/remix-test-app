import { Form, useLoaderData, FormEncType, useFetcher, useSearchParams } from "@remix-run/react";
import { FormEventHandler } from "react";

import { loader } from "~/routes/form.($step)";
import StepIntro from "./steps/StepIntro";
import StepUser from "./steps/StepUser";
import StepDocument from "./steps/StepDocument";
import StepDate from "./steps/StepDate";
import StepConfirm from "./steps/StepConfirm";
import Navigation, { links as navigationLinks } from "./Navigation";
import Island from "~/components/Island";
import RetryLaterModal from "~/components/RetryLaterModal";
import { STEPS, STEPS_TITLES } from "~/constants/form";
import { FileInfo } from "~/@types/form";
import styles from './styles.css';
import { MODAL_PARAM_KEY } from "~/constants/errorModal";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...navigationLinks(),
];

export default function FormContent() {
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const { step, fields, error: loaderError } = useLoaderData<typeof loader>();

  const formSteps = {
    [0]: StepIntro,
    [1]: StepUser,
    [2]: StepDocument,
    [3]: StepDate,
    [4]: StepConfirm,
  };
  const CurrentStep = formSteps[step];
  // В интро и конфирм шагах нет полей для multipart/form-data, поэтому используем дефолтную кодировку
  const isIntroOrConfirmStep = step === STEPS[0] || step === STEPS[STEPS.length - 1];
  const formEncType: FormEncType = isIntroOrConfirmStep ? 'application/x-www-form-urlencoded' : 'multipart/form-data';

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const documentField = 'document';
    const savedFilesInfo = fields[documentField]?.value as FileInfo<'saved'>[] | undefined;
    const formData = new FormData(event.currentTarget);
    const hasFilesInForm = !!formData.get(documentField);
    // К моменту отправки формы все файлы уже сохранены
    // Отправляем только ссылки на файлы в хранилище файлов
    if (hasFilesInForm && savedFilesInfo) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.delete(documentField);
      if (savedFilesInfo.length) {
        savedFilesInfo.forEach(fileInfo => {
          formData.append(documentField, JSON.stringify(fileInfo));
        });
      } else {
        formData.append(documentField, '');
      }
      fetcher.submit(formData, { method: "POST", encType: "multipart/form-data" });
    }
  };

  return (
    <Form replace className="Form" method="post" encType={formEncType} onSubmit={onSubmit}>
      <Island size="s">
        <h1 className="Form__Heading">{STEPS_TITLES[step]}</h1>
        <CurrentStep />
        <Navigation step={step} />
      </Island>
      <RetryLaterModal
        type={loaderError ? 'loading' : 'submit'}
        isFinalForm={step === STEPS[STEPS.length - 1]}
      />
    </Form>
  );
}