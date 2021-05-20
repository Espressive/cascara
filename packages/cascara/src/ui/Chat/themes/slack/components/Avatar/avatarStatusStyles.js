import { pxToRem } from '../../../utils';

const sizeToPxValue = {
  smallest: 6,
  smaller: 10,
  small: 10,
  medium: 10,
  large: 10,
  larger: 16,
  largest: 0,
};

export const getSizeStyles = (sizeInPx) => {
  const sizeInRem = pxToRem(sizeInPx);

  return {
    height: sizeInRem,
    width: sizeInRem,
  };
};

export const avatarStatusStyles = {
  root: ({ variables: v, props: { color, size, state } }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getSizeStyles(sizeToPxValue[size]),
    verticalAlign: 'middle',
    borderRadius: '9999px',
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 ${v.statusBorderWidth} ${v.statusBorderColor}`,
    ...(state === 'success' && {
      backgroundColor: v.statusSuccessBackgroundColor,
    }),
    ...(state === 'info' && {
      backgroundColor: v.statusInfoBackgroundColor,
    }),
    ...(state === 'warning' && {
      backgroundColor: v.statusWarningBackgroundColor,
    }),
    ...(state === 'error' && {
      backgroundColor: v.statusErrorBackgroundColor,
    }),
    ...(state === 'unknown' && {
      backgroundColor: v.statusBackgroundColor,
    }),
    ...(Boolean(color) && {
      backgroundColor: color,
    }),
  }),
};
