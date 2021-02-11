import { teamsTheme } from '@fluentui/react-northstar';
import { createTheme } from '@fluentui/styles';

import fontFaces from './fontFaces';
import siteVariables from './siteVariables';

const slack = createTheme(
  {
    ...teamsTheme,
    fontFaces,
    siteVariables,
  },
  'slack'
);

export default slack;
