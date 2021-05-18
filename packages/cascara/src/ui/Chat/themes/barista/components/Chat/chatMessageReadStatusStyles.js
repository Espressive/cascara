import { screenReaderContainerStyles } from '../../../utils';

export const chatMessageReadStatusStyles = {
  root: ({ props: p, variables: v }) => ({
    position: 'absolute',
    right: v.rightPoistion,
    bottom: v.bottomPoistion,
    ':after': {
      content: `"${p.title}"`,
      ...screenReaderContainerStyles,
    },
  }),
};
