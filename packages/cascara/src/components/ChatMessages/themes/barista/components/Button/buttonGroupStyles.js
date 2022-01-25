import { pxToRem } from '../../../utils';

const commonButtonsStyles = (circular) =>
  circular ? { marginRight: pxToRem(8) } : { borderRadius: 0 };

export const buttonGroupStyles = {
  root: () => ({}),
  middleButton: ({ props: p }) => ({
    ...commonButtonsStyles(p.circular),
  }),
  firstButton: ({ props: p, variables: v }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopLeftRadius: v.borderRadius,
      borderBottomLeftRadius: v.borderRadius,
    }),
  }),
  lastButton: ({ props: p, variables: v }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopRightRadius: v.borderRadius,
      borderBottomRightRadius: v.borderRadius,
    }),
  }),
};
