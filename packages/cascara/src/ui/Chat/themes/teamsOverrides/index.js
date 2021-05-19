import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsTheme,
} from '@fluentui/react-northstar';

const TEAMS_THEME_NAMES = [
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsTheme,
].map((func) => func.name);

const teamsThemeOverrides = (teamsThemeName) => {
  if (!TEAMS_THEME_NAMES.includes(teamsThemeName)) {
    throw new Error(
      `${teamsThemeName} is invalid. Must be one of: ${TEAMS_THEME_NAMES.join(
        ', '
      )}`
    );
  }
};

export default teamsThemeOverrides;
