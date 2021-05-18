/* eslint-disable sort-keys -- We do not want necessarily sort these for consistent grouping */
export const chatMessageDetailsStyles = {
  root: ({ props: p, variables: v }) => ({
    marginLeft: v.detailsMargin,
    fontSize: v.detailsFontSize,
    display: 'inline-block',
    color: v.detailsColor,
    ':hover': {
      color: v.detailsHoverColor,
    },
    ...(p.mine && {
      color: v.detailsColorMine,
      ':hover': {
        color: v.detailsHoverColorMine,
      },
    }),
  }),
};
/* eslint-enable sort-keys*/
