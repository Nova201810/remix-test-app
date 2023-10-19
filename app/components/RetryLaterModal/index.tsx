import { useNavigation, useSearchParams } from '@remix-run/react';

import { MODAL_PARAM_KEY, MODAL_STATE } from '~/constants/errorModal';
import ErrorIcon from '~/components/icons/Error';
import CloseIcon from '~/components/icons/Close';
import Stack from '~/components/Stack';
import Button from '~/components/Button';
import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type Props = {
  type: 'submit' | 'loading';
  isFinalForm: boolean;
};

export default function RetryLaterModal({ type, isFinalForm }: Props) {
  const { location } = useNavigation();
  const initSearchParams = new URLSearchParams(location?.search);
  const [searchParams, setSearchParams] = useSearchParams(initSearchParams);
  const isVisible = searchParams.get(MODAL_PARAM_KEY) === MODAL_STATE.VISIBLE;

  if (!isVisible) {
    return null;
  }

  const onHide = () => {
    searchParams.set(MODAL_PARAM_KEY, MODAL_STATE.CLOSED);
    setSearchParams(searchParams);
  };

  // Даем установить searchParams перед отправкой формы
  const onRetry = async () => {
    await new Promise(resolve => {
      setTimeout(() => {
        onHide();
        resolve(true);
      });
    });
  };

  return (
    <div className="RetryLaterModal">
      <ErrorIcon className="RetryLaterModal__Icon" />
      <Stack space="m" className="RetryLaterModal__Content">
        <h2>Произошла техническая ошибка</h2>
        <p className="RetryLaterModal__Content_Text">Попробуйте повторить попытку или вернитесь позднее.</p>
        <Button kind="primary" type={type} onClick={onRetry}>
          Повторить
        </Button>
      </Stack>
      {!isFinalForm && (
        <button
          type="button"
          className="RetryLaterModal__Close"
          onClick={onHide}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}