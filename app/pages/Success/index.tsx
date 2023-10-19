
import { useLoaderData } from '@remix-run/react';

import { loader } from '~/routes/success.($applicationNumber)';
import SuccessIcon from '~/components/icons/Success';
import Island from '~/components/Island';
import styles from './styles.css';

export const links = () => [
  { rel: "stylesheet", href: styles },
];

export default function SuccessContent() {
  const { applicationNumber } = useLoaderData<typeof loader>();

  return (
    <Island size="s" className="Success">
      <SuccessIcon className="Success__Icon" />
      <div className="Success__Content">
        <h1 className="Success__Content_Heading">
          Заявка {applicationNumber} подана
        </h1>
        <div className="Success__Content_Hint">Статус заявки вы можете отслеживать в личном кабинете.</div>
        <p className="Success__Content_Info">
          Ваша заявка будет рассмотрена оператором в течении 24 часов. Если возникнут вопросы, с вами свяжутся по указанному ранее номеру.
        </p>
      </div>
    </Island>
  );
}