import { teamsTheme } from '@fluentui/react-northstar';
import { createTheme } from '@fluentui/styles';

import fontFaces from './fontFaces';
import siteVariables from './siteVariables';

import * as componentStyles from './componentStyles';
import * as componentVariables from './componentVariables';

// Temporarily merging
const mergedComponentStyles = {
  ...teamsTheme.componentStyles,
  ...componentStyles,
};

const mergedComponentVariables = {
  ...teamsTheme.componentVariables,
  ...componentVariables,
};

const barista = createTheme(
  {
    componentStyles: mergedComponentStyles,
    componentVariables: mergedComponentVariables,
    fontFaces,
    siteVariables,
  },
  'barista'
);

export default barista;
