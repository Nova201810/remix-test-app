import {
  createCookie,
  createFileSessionStorage,
} from "@remix-run/node";

const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  sameSite: true,
});

const { getSession, commitSession, destroySession } =
  createFileSessionStorage({
    // корневая директория для записи файлов
    // убедитесь, что она доступна для записи
    dir: ".sessions",
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };