import { pxToRem } from '../../../utils';

// export interface ChatMessageVariables {
//   actionMenuBoxShadow: string;
//   actionMenuPositionRight: string;
//   actionMenuPositionTop: string;
//   backgroundColor: string;
//   backgroundColorMine: string;
//   borderRadius: string;
//   color: string;
//   offset: string;
//   padding: string;
//   authorMarginRight: string;
//   authorColor: string;
//   authorFontWeight: number;
//   headerMarginBottom: string;
//   contentColor: string;
//   linkColor: string;
//   linkColorMine: string;
//   border: string;
//   badgeShadow: string;
//   isImportant: boolean;
//   hasMention: boolean;
//   hasMentionColor: string;
//   hasMentionNubbinColor: string;
//   isImportantColor: string;
//   badgeTextColor: string;
//   reactionGroupMarginLeft: string;
//   reactionGroupBorderColor: string;
//   showActionMenu?: boolean;
//   timestampColorMine: string;
//   zIndex: number;
//   overlayZIndex: number;
// }

export const chatMessageVariables = ({
  borderRadiusMedium,
  colors,
  colorScheme,
  fontWeightSemibold,
  shadowLevel1,
  shadowLevel1Dark,
  zIndexes,
}) => ({
  actionMenuBoxShadow: shadowLevel1,
  actionMenuPositionRight: pxToRem(5),
  actionMenuPositionTop: pxToRem(-30),
  authorColor: colorScheme.default.foreground,
  authorFontWeight: fontWeightSemibold,
  authorMarginRight: pxToRem(12),
  backgroundColor: colors.grey[150],
  backgroundColorMine: `var(--brand-color, ${colors.brand[200]})`,
  badgeShadow: shadowLevel1Dark,
  badgeTextColor: colors.white,
  border: 'none',
  borderRadius: pxToRem(8),
  color: 'rgb(64, 64, 64)',
  contentColor: colors.grey[750],
  contentColorMine: `var(--brand-text-color, ${colors.grey[750]})`,
  hasMention: false,
  hasMentionColor: colors.orange[300],
  hasMentionNubbinColor: colors.orange[400],
  headerMarginBottom: pxToRem(2),
  isImportant: false,
  isImportantColor: colors.red[400],
  linkColor: colorScheme.brand.foreground1,
  linkColorMine: colorScheme.brand.foreground2,
  offset: pxToRem(-42),
  overlayZIndex: zIndexes.overlay,
  padding: pxToRem(12),
  reactionGroupBorderColor: 'transparent',
  reactionGroupMarginLeft: pxToRem(12),
  showActionMenu: undefined,
  timestampColorMine: `var(--brand-text-color, ${colorScheme.default.foreground1})`,
  zIndex: zIndexes.foreground,
});
