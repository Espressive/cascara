import { pxToRem } from '../../../utils';

// export interface ChatItemVariables {
//   margin: string;
//   gutterMargin: string;
//   messageMargin: string;
// }

export const chatItemVariables = () => ({
  gutterMargin: 0,
  margin: pxToRem(8),
  messageMargin: pxToRem(40),
});
