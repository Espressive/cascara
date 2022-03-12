export const avatarStatusIconStyles = {
  root: ({ props: { state }, variables: v }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.statusIconSize,
    height: v.statusIconSize,
    color: v.statusColor,
    ...(state === 'success' && {
      color: v.statusSuccessColor,
    }),
    ...(state === 'info' && {
      color: v.statusInfoColor,
    }),
    ...(state === 'error' && {
      color: v.statusErrorColor,
    }),
    ...(state === 'warning' && {
      color: v.statusWarningColor,
    }),

    '& > :first-child': {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
  }),
};
