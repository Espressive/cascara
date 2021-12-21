import { pxToRem } from '../../../utils';

export const chatItemStyles = {
  root: ({ props: p, variables: v }) => ({
    position: 'relative',
    ...((!p.attached || p.attached === 'top') && { paddingTop: pxToRem(16) }),
    ...((p.attached === 'bottom' || p.attached === true) && {
      paddingTop: pxToRem(2),
    }),
    paddingBottom: 0,
  }),

  gutter: ({ props: p, variables: v }) => ({
    position: 'absolute',
    marginTop: v.gutterMargin,
    [p.contentPosition === 'end' ? 'right' : 'left']: 0,
    ...((p.attached === 'bottom' || p.attached === true) && {
      display: 'none',
    }),
  }),

  message: ({ props: p, variables: v }) => ({
    position: 'relative',
    float: p.contentPosition === 'end' ? 'right' : 'left',
    marginLeft: v.messageMargin,
    marginRight: v.messageMargin,
  }),
};
