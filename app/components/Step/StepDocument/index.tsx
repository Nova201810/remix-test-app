import { useLoaderData } from "@remix-run/react";

import { loader } from "~/routes/new.($step)";

export default function StepDocument() {
  const loaderData = useLoaderData<typeof loader>();
  const hasDocumentError = !!loaderData?.fields.document?.error;

  return (
    <>
      {hasDocumentError && (
        <div style={{ color: 'red', fontSize: '14px' }}>{loaderData.fields.document.error}</div>
      )}
      <label>
        Номер документа:
        <input
          name="document"
          type="text"
          defaultValue={loaderData?.fields.document?.value}
          style={hasDocumentError ? { borderColor: 'red' } : {}}
        />
      </label>
    </>
  );
}