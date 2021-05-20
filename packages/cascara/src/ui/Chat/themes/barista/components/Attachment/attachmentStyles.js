import { svgIconClassName } from '@fluentui/react-icons-northstar';

import { attachmentActionClassName } from '@fluentui/react-northstar';
import { getBorderFocusStyles, pxToRem } from '../../../utils';

export const attachmentStyles = {
  root: ({ props: p, variables: v, theme: { siteVariables } }) => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.borderRadius,
    });

    return {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: pxToRem(440),
      minHeight: pxToRem(48),
      padding: v.padding,
      marginBottom: pxToRem(2),
      marginRight: pxToRem(2),
      background: v.backgroundColor,
      color: v.textColor,
      // boxShadow: v.boxShadow,
      border: `${pxToRem(2)} solid ${v.borderColor}`,
      borderRadius: v.borderRadius,

      ...borderFocusStyles,

      '& .ui-attachment__progress': {
        transition: 'width 0.2s',
        position: 'absolute',
        display: 'block',
        bottom: 0,
        left: 0,
        maxWidth: '100%',
        height: v.progressHeight,
        background: v.progressColor,
      },

      ...(p.actionable && {
        cursor: 'pointer',

        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          backgroundColor: v.focusBackgroundColor,
          color: v.focusColor,

          [`& .${attachmentActionClassName}`]: {
            color: v.focusColor,
          },

          [`& .${svgIconClassName}`]: {
            color: v.focusColor,
          },
        },

        ':hover': {
          backgroundColor: v.backgroundColorHover,
          color: v.textColorHover,

          [`& .${attachmentActionClassName}`]: {
            color: v.textColorHover,
          },

          [`& .${svgIconClassName}`]: {
            color: v.textColorHover,
          },
        },
      }),
    };
  },
};
