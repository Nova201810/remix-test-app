import { Form, useLoaderData } from "@remix-run/react";

import { loader } from "~/routes/new.($step)";
import StepIntro from "./StepIntro";
import StepUser from "./StepUser";
import StepDocument from "./StepDocument";
import Navigation from "./common/Navigation";

export default function Step() {
  const { step } = useLoaderData<typeof loader>();
  const formSteps = {
    [0]: StepIntro,
    [1]: StepUser,
    [2]: StepDocument,
    [3]: () => <div>Шаг 3</div>,
    [4]: () => <div>Шаг 4</div>,
  };
  const CurrentStep = formSteps[step];

  return (
    <Form method="post" replace>
      <CurrentStep />
      <Navigation step={step} />
    </Form>
  );
}