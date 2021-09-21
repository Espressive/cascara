import {
  getBorderFocusStyles,
  getIconFillOrOutlineStyles,
  pxToRem,
} from '../../../utils';
import { loaderSlotClassNames } from '@fluentui/react-northstar';

export const attachmentActionStyles = {
  root: ({ props: p, variables: v, theme }) => {
    const { siteVariables } = theme;
    const iconFilledStyles = getIconFillOrOutlineStyles({ outline: false });
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.actionFocusBorderRadius,
    });

    return {
      height: v.actionHeight,
      maxWidth: v.actionMaxWidth,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      cursor: 'pointer',

      // text button defaults
      color: v.actionColor, // textColor
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0,

      // by default icons should always be outline, but filled on hover/focus
      ...getIconFillOrOutlineStyles({ outline: true }),

      ':focus': {
        boxShadow: 'none',
        ...borderFocusStyles[':focus'],
      },
      ':focus-visible': {
        ...iconFilledStyles,
        ...borderFocusStyles[':focus-visible'],
      },

      ...(p.primary && {
        color: v.actionPrimaryColor,
      }),

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        cursor: 'default',
        boxShadow: 'none',
        pointerEvents: 'none',

        color: v.actionColorDisabled,
        backgroundColor: 'transparent',
        ':hover': {
          color: v.actionColorDisabled,
        },
      }),

      minWidth: v.actionHeight,
      ':hover': {
        ...getIconFillOrOutlineStyles({ outline: false }),
      },
    };
  },

  icon: ({ props: p, variables: v }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.actionIconSize,
    height: v.actionIconSize,

    // when loading, hide the icon
    ...(p.loading && {
      margin: 0,
      opacity: 0,
      width: 0,
    }),

    ...(p.hasContent && {
      margin: `0 ${pxToRem(10)} 0 0`,
      ...(p.iconPosition === 'after' && {
        margin: `0 0 0 ${pxToRem(10)}`,
      }),
    }),
  }),
  loader: ({ props: p, variables: v }) => ({
    [`& .${loaderSlotClassNames.indicator}`]: {
      width: v.actionLoaderSize,
      height: v.actionLoaderSize,
    },
    [`& .${loaderSlotClassNames.svg}`]: {
      ':before': {
        animationName: {
          to: {
            transform: `translate3d(0, ${v.actionLoaderSvgAnimationHeight}, 0)`,
          },
        },
        borderWidth: v.actionLoaderBorderSize,
        width: v.actionLoaderSize,
        height: v.actionLoaderSvgHeight,
      },
    },

    ...(p.hasContent && {
      marginRight: pxToRem(4),
    }),
  }),
};
