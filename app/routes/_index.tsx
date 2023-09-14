import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Сервис подачи заявления</h1>
      <Link to="/new">Подать заявление</Link>
    </div>
  );
}
