import { svgIconClassName } from '@fluentui/react-icons-northstar';

export const attachmentIconStyles = {
  root: ({ variables: v }) => ({
    height: v.iconSize,
    width: v.iconSize,
    marginRight: v.iconSpace,

    [`& .${svgIconClassName}`]: {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
  }),
};
