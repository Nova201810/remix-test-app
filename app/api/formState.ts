import { fetch } from "@remix-run/node";

import type { FormField } from "~/@types/form";

const isEnvProduction = process.env.NODE_ENV === 'production';
const originPath = isEnvProduction ? 'https://CHANGE_ME_PROD_PATH' : 'http://localhost:3000';
const formStatePath = `${originPath}/api/state`;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function getFormState() {
  const response = await fetch(formStatePath,{ headers });
  return await response.json();
}

export async function updateFormState(updatedFields: Record<string, FormField>) {
  const response = await fetch(formStatePath, { method: 'PUT', body: JSON.stringify(updatedFields), headers });
  return await response.json();
}

export async function deleteFormState() {
  const response = await fetch(formStatePath, { method: 'DELETE' });
  return await response.json();
}