import { fetch } from "@remix-run/node";
import { FormData } from "~/@types/form";

const isEnvProduction = process.env.NODE_ENV === 'production';
const originPath = isEnvProduction ? 'https://CHANGE_ME_PROD_PATH' : 'http://localhost:3000';
const submitFormPath = `${originPath}/api/submit`;
const headers = {
  'Content-Type': 'application/json',
};

export async function submitForm(formData: FormData) {
  const response = await fetch(submitFormPath, { method: 'POST', body: JSON.stringify(formData), headers });
  const data = await response.json();
  return data as { applicationNumber: string };
}