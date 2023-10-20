import { Params } from "@remix-run/react";

import { STEPS } from "~/constants/form";

export const getStep = (params: Params) => (params.step ? +params.step : 0) as typeof STEPS[number];