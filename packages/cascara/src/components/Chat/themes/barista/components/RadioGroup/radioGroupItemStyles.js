import { radioGroupItemSlotClassNames } from '@fluentui/react-northstar';
import { getBorderFocusStyles, pxToRem } from '../../../utils';

const restHoverFocusTextColor = (textColor) => ({
  color: textColor,

  ':hover': {
    color: textColor,
  },

  ':focus': {
    color: textColor,
  },
});

export const radioGroupItemStyles = {
  root: ({ props: p, variables: v, theme: { siteVariables } }) => ({
    position: 'relative',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: `${pxToRem(1)}`,
    borderColor: 'transparent',
    borderRadius: siteVariables.borderRadiusMedium,
    color: v.textColorDefault,
    cursor: 'pointer',
    display: p.vertical ? 'flex' : 'inline-flex',
    fontSize: v.textFontSize,
    padding: v.padding,
    margin: v.margin,

    ':hover': {
      color: v.textColorDefaultHoverFocus,

      [`& .${radioGroupItemSlotClassNames.indicator}`]: {
        borderColor: v.textColorDefaultHoverFocus,

        ...(!p.disabled &&
          !p.checked && {
            borderColor: v.indicatorBorderColorDefaultHover,
          }),
      },
    },

    ':focus': {
      color: v.textColorDefaultHoverFocus,
    },

    ...(p.checked && {
      ...restHoverFocusTextColor(v.textColorChecked),
    }),

    ...(p.disabled && {
      ...restHoverFocusTextColor(v.colorDisabled),
    }),

    ...getBorderFocusStyles({ variables: siteVariables }),
  }),

  indicator: ({ props: p, variables: v }) => ({
    margin: `${pxToRem(2)} 0`,
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: pxToRem(16),
    height: pxToRem(16),
    verticalAlign: 'midddle',
    color: v.indicatorColorDefault,

    ...(p.checked && {
      color: v.indicatorBackgroundColorChecked,
    }),

    ...(p.disabled && {
      color: v.colorDisabled,
    }),
  }),

  label: () => ({
    margin: `0 0 0 ${pxToRem(12)}`,
  }),
};
