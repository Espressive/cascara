import { teamsTheme } from '@fluentui/react-northstar';
import { pxToRem } from '../utils';

const siteVariables = {
  ...teamsTheme.siteVariables,
  bodyFontFamily: 'Slack-Lato,appleLogo,sans-serif',
  bodyFontSize: pxToRem(15),
};

export default siteVariables;
