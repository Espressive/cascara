import { pxToRem } from '../../../utils';

// export interface ChatItemVariables {
//   margin: string;
//   gutterMargin: string;
//   messageMargin: string;
// }

export const chatItemVariables = () => ({
  gutterMargin: pxToRem(4),
  margin: pxToRem(8),
  messageMargin: pxToRem(44),
});
