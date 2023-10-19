import { LinksFunction } from "@remix-run/node";

import { links as buttonLinks } from '~/components/Button';
import { links as collapseLinks } from '~/components/Collapse';
import { links as fileUploaderLinks } from '~/components/FileUploader';
import { links as formConfirmBlockLinks } from '~/components/FormConfirmBlock';
import { links as labelledFieldLinks } from '~/components/LabelledField';
import { links as labelledFieldsetLinks } from "~/components/LabelledFieldset";
import { links as labelledRadioLinks } from "~/components/LabelledRadio";
import { links as islandLinks } from '~/components/Island';
import { links as retryLaterModalLinks } from "~/components/RetryLaterModal";
import { links as stackLinks } from '~/components/Stack';

export const stylesLinks: LinksFunction = () => [
  ...buttonLinks(),
  ...collapseLinks(),
  ...fileUploaderLinks(),
  ...formConfirmBlockLinks(),
  ...labelledFieldLinks(),
  ...labelledFieldsetLinks(),
  ...labelledRadioLinks(),
  ...islandLinks(),
  ...retryLaterModalLinks(),
  ...stackLinks(),
];