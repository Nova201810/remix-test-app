import { useLoaderData } from "@remix-run/react";

import { loader } from "~/routes/new.($step)";

export default function StepIntro() {
  const loaderData = useLoaderData<typeof loader>();
  const hasUserError = !!loaderData?.fields.user?.error;
  const hasPhoneError = !!loaderData?.fields.phone?.error;

  return (
    <>
      {hasUserError && (
        <div style={{ color: 'red', fontSize: '14px' }}>{loaderData.fields.user.error}</div>
      )}
      <label>
        ФИО:
        <input
          name="user"
          type="text"
          defaultValue={loaderData?.fields.user?.value}
          style={hasUserError ? { color: 'red' } : {}}
        />
      </label>
      {hasPhoneError && (
        <div style={{ color: 'red', fontSize: '14px' }}>{loaderData.fields.phone.error}</div>
      )}
      <label>
        Номер телефона:
        <input
          name="phone"
          type="text"
          defaultValue={loaderData?.fields.phone?.value}
          style={hasUserError ? { color: 'red' } : {}}
        />
      </label>
    </>
  );
}