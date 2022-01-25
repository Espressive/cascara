import { teamsTheme } from '@fluentui/react-northstar';
import slackFonts from '../slack/fontFaces';

const fontFaces = [
  // We are intentionally loading all font faces for the other themes here,
  // so that we can fully support theme switching.
  ...teamsTheme.fontFaces,
  ...slackFonts,
];

export default fontFaces;
