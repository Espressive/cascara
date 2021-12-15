import {
  pickValuesFromColorScheme,
  pxToRem,
  stringLiteralsArray,
} from '../../../utils';

export const dividerColorAreas = stringLiteralsArray('foreground');
// export type DividerColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof dividerColorAreas>>;

// export interface DividerVariables {
//   colorScheme: DividerColorSchemeMapping;
//   dividerColor: string;
//   textColor: string;
//   textFontSize: string;
//   textLineHeight: string;
//   importantFontWeight: FontWeightProperty;
//   dividerPadding: string;
// }

export const dividerVariables = (siteVars) => ({
  colorScheme: pickValuesFromColorScheme(
    siteVars.colorScheme,
    dividerColorAreas
  ),
  dividerColor: siteVars.colors.grey[150],
  textColor: siteVars.colors.grey[450],
  textFontSize: siteVars.fontSizeSmall,
  textLineHeight: siteVars.lineHeightSmall,
  importantFontWeight: siteVars.fontWeightBold,
  dividerPadding: pxToRem(4),
});
