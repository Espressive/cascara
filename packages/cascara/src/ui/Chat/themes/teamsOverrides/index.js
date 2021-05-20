import { mergeComponentStyles } from '@fluentui/styles';
import chatStyles from './chatStyles';
// import chatVariables from './chatVariables';

import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsTheme,
} from '@fluentui/react-northstar';

const TEAMS_THEMES = { teamsDarkTheme, teamsHighContrastTheme, teamsTheme };

const teamsThemeOverrides = (teamsThemeName) => {
  // Check to make sure we are using an actual Teams theme
  if (!Object.keys(TEAMS_THEMES).includes(teamsThemeName)) {
    throw new Error(
      `${teamsThemeName} is invalid. Must be one of: ${Object.keys(
        TEAMS_THEMES
      ).join(', ')}`
    );
  }

  const theme = {
    ...TEAMS_THEMES[teamsThemeName],
    componentStyles: {
      ...TEAMS_THEMES[teamsThemeName].componentStyles,
      Chat: mergeComponentStyles(
        TEAMS_THEMES[teamsThemeName].componentStyles.Chat,
        chatStyles
      ),
    },
    staticStyles: [], // Remove static styles from Teams themes.
  };

  // console.log(theme.componentStyles.Chat);

  // Return the theme, but override a few things
  return theme;
};

export default teamsThemeOverrides;
