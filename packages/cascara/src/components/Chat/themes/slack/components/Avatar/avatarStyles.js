// import { pxToRem } from '../../../utils';

// const sizeToPxValue = {
//   smallest: 20,
//   smaller: 24,
//   small: 28,
//   medium: 32,
//   large: 44,
//   larger: 64,
//   largest: 96,
// };

export const avatarStyles = {
  root: ({ props: { size }, variables: v }) => {
    // const sizeInRem = pxToRem(sizeToPxValue[size]);

    return {
      position: 'relative',
      backgroundColor: 'inherit',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: v.imageAvatarSize,
      width: v.imageAvatarSize,
    };
  },
};
