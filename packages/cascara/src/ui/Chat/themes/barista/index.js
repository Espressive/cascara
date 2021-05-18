import { teamsTheme } from '@fluentui/react-northstar';
import { createTheme } from '@fluentui/styles';

import fontFaces from './fontFaces';
import siteVariables from './siteVariables';

import * as componentStyles from './componentStyles';
import * as componentVariables from './componentVariables';

// These are component themes that we want to copy over without modification
const COPY_COMPONENTS = ['Flex', 'Image', 'Text'];

// Temporarily merging
const mergedComponentStyles = {
  // ...teamsTheme.componentStyles, // This will eventually be commented out
  ...Object.fromEntries(
    COPY_COMPONENTS.map((component) => [
      component,
      teamsTheme.componentStyles[component],
    ])
  ),
  ...componentStyles,
};
// console.log(mergedComponentStyles);

const mergedComponentVariables = {
  // ...teamsTheme.componentVariables,
  ...Object.fromEntries(
    COPY_COMPONENTS.map((component) => [
      component,
      teamsTheme.componentVariables[component],
    ])
  ),
  ...componentVariables,
};

// console.log(mergedComponentVariables);

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
