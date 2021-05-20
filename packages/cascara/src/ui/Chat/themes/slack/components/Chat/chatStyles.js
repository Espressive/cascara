import { pxToRem } from '../../../utils';

export const chatStyles = {
  root: ({ variables: v, theme: { siteVariables } }) => {
    return {
      backgroundColor: v.backgroundColor,
      border: `1px solid ${v.backgroundColor}`,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: siteVariables.bodyFontFamily,
      fontSize: siteVariables.bodyFontSize,
      listStyle: 'none',
      padding: `0 ${pxToRem(16)} 0 ${pxToRem(16)}`,
      margin: 0,

      '[hidden]': {
        display: 'none!important',
      },
    };
  },
};
