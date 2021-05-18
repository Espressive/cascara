import { screenReaderContainerStyles } from '../../../utils';

/* eslint-disable sort-keys -- We do not want necessarily sort these for consistent grouping */
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
/* eslint-enable sort-keys*/
