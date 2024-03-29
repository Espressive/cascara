import { pxToRem } from '../../../utils';

const sizeToPxValue = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96,
};

export const avatarLabelStyles = {
  root: ({ props: p, variables: v }) => {
    const sizeInRem = pxToRem(sizeToPxValue[p.size]);
    return {
      alignItems: 'center',
      overflow: 'hidden',
      color: v.labelColor,
      backgroundColor: v.labelBackground,
      borderRadius: '50%',
      display: 'inline-block',
      width: sizeInRem,
      height: sizeInRem,
      lineHeight: sizeInRem,
      fontSize: pxToRem(sizeToPxValue[p.size] / 2.333),
      verticalAlign: 'top',
      textAlign: 'center',
      padding: '0',
      ...(p.square && {
        borderRadius: v.squareAvatarBorderRadius,
      }),
      ...(p.circular && {
        borderRadius: v.labelCircularRadius,
      }),
    };
  },
};
