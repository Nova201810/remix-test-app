import {
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.data?.message ?? error.data}</h1>
        <p>Status: {error.status}</p>
      </div>
    );
  }

  let errorMessage = "Unknown error";
  if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = error.message as string;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}