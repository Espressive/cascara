import { pxToRem } from '../../../utils';

export const chatStyles = {
  root: ({ variables: v, theme: { siteVariables } }) => {
    return {
      backgroundColor: v.backgroundColor,
      border: `1px solid ${v.backgroundColor}`,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: siteVariables.bodyFontFamily,
      listStyle: 'none',
      padding: `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
      margin: 0,
    };
  },
};
