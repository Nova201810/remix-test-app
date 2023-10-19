import { fetch } from "@remix-run/node";

import type { FormData } from "~/@types/form";

const isEnvProduction = process.env.NODE_ENV === 'production';
const originPath = isEnvProduction ? 'https://CHANGE_ME_PROD_PATH' : 'http://localhost:3000';
const formStatePath = `${originPath}/api/state`;
const headers = {
  'Content-Type': 'application/json',
};

export async function getFormState() {
  const response = await fetch(formStatePath, { headers });
  const formState = await response.json();
  return formState as FormData;
}

export async function updateFormState(updatedFields: FormData) {
  const response = await fetch(formStatePath, { method: 'PUT', body: JSON.stringify(updatedFields), headers });
  const formState = await response.json();
  return formState as FormData;
}

export async function deleteFormState() {
  const response = await fetch(formStatePath, { method: 'DELETE' });
  const formState = await response.json();
  return formState as FormData;
}