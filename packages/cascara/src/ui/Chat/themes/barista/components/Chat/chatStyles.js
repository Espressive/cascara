import { pxToRem } from '../../../utils';

/* eslint-disable sort-keys -- We do not want necessarily sort these for consistent grouping */
export const chatStyles = {
  root: ({ variables: v }) => ({
    backgroundColor: v.backgroundColor,
    border: `1px solid ${v.backgroundColor}`,
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding: `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
    margin: 0,
  }),
};
/* eslint-enable sort-keys*/
