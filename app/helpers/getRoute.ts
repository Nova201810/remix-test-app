export enum PAGES {
  INDEX = 'INDEX',
  FORM = 'FORM',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
};

const ROUTES = {
  [PAGES.INDEX]: '/',
  [PAGES.FORM]: '/form',
  [PAGES.SUCCESS]: '/success',
  [PAGES.ERROR]: '/error',
} as const;

type Props =
  | [PAGES.FORM] | [PAGES.FORM, number]
  | [PAGES.SUCCESS, string]
  | [Exclude<PAGES, PAGES.FORM | PAGES.SUCCESS>];

export function getRoute(...props: Props) {
  const [page, ...params] = props;
  const pageRoute = ROUTES[page];
  const routeParts = [pageRoute, ...params];
  return routeParts.join('/');
}