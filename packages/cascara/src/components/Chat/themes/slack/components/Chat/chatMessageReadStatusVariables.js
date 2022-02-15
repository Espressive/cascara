import { pxToRem } from '../../../utils';

// export interface ChatMessageReadStatusVariables {
//   rightPoistion?: string;
//   bottomPoistion?: string;
// }

export const chatMessageReadStatusVariables = () => ({
  bottomPoistion: pxToRem(0),
  rightPoistion: pxToRem(-24),
});
