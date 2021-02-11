import { teamsTheme } from '@fluentui/react-northstar';
import { createTheme } from '@fluentui/styles';

import fontFaces from './fontFaces';
import siteVariables from './siteVariables';

const barista = createTheme(
  {
    ...teamsTheme,
    fontFaces,
    siteVariables,
  },
  'barista'
);

export default barista;
