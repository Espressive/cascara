import { pxToRem } from '../../../utils';

// export interface ChatMessageDetailsVariables {
//   detailsColor: string;
//   detailsHoverColor: string;
//   detailsColorMine: string;
//   detailsHoverColorMine: string;
//   detailsFontSize: string;
//   detailsMargin: string;
// }

export const chatMessageDetailsVariables = ({ colors, fontSizes }) => ({
  detailsColor: colors.grey[350],
  detailsColorMine: colors.grey[500],
  detailsFontSize: fontSizes.small,
  detailsHoverColor: colors.grey[500],
  detailsHoverColorMine: colors.grey[500],
  detailsMargin: pxToRem(12),
});
