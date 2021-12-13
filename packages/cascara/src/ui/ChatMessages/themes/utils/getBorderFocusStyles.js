// type CSSBorderStyles = Pick<React.CSSProperties, 'borderWidth' | 'borderRadius'>;
// type BorderPadding = Record<'top' | 'bottom' | 'left' | 'right', string>;
// type BorderFocusStyles = CSSBorderStyles & {
//   variables?:
//     | SiteVariablesPrepared
//     | {
//         borderWidth: string;
//         borderRadius: string;
//         focusInnerBorderColor: string;
//         focusOuterBorderColor: string;
//         zIndexes: { foreground: string };
//       };
//   focusInnerBorderColor?: string;
//   focusOuterBorderColor?: string;
//   borderPadding?: string | BorderPadding;
// };

const defaultColor = 'transparent';
/**
 * Returns style object that can be used for styling components on focus state.
 * NOTE: the element where this is used needs to have relative positioning so that the
 * pseudo elements created on focus can be properly positioned.
 */

const getBorderFocusStyles = (args) => {
  const sv = args.variables;
  const {
    borderWidth = sv.borderWidth,
    borderRadius = sv.borderRadius,
    focusInnerBorderColor = sv.focusInnerBorderColor || defaultColor,
    focusOuterBorderColor = sv.focusOuterBorderColor || defaultColor,
    borderPadding,
  } = args;
  const defaultPreudoStyles = {
    borderRadius,
    borderStyle: 'solid',
    borderWidth,
    content: '""',
    pointerEvents: 'none',
    position: 'absolute',
  };
  const borderPaddingTop = borderPadding?.top || borderPadding;
  const borderPaddingBottom = borderPadding?.bottom || borderPadding;
  const borderPaddingLeft = borderPadding?.left || borderPadding;
  const borderPaddingRight = borderPadding?.right || borderPadding;
  return {
    ':focus': {
      outline: 'none',
    },
    ':focus-visible': {
      borderColor: 'transparent',
      ':before': {
        ...defaultPreudoStyles,
        zIndex: sv.zIndexes.foreground,
        borderColor: focusInnerBorderColor,
        top: borderPadding == null ? '0' : `-${borderPaddingTop}`,
        bottom: borderPadding == null ? '0' : `-${borderPaddingBottom}`,
        left: borderPadding == null ? '0' : `-${borderPaddingLeft}`,
        right: borderPadding == null ? '0' : `-${borderPaddingRight}`,
      },
      ':after': {
        ...defaultPreudoStyles,
        zIndex: sv.zIndexes.foreground,
        borderColor: focusOuterBorderColor,
        top:
          borderPadding == null
            ? `-${borderWidth}`
            : `calc(0px - ${borderPaddingTop} - ${borderWidth})`,
        bottom:
          borderPadding == null
            ? `-${borderWidth}`
            : `calc(0px - ${borderPaddingBottom} - ${borderWidth})`,
        left:
          borderPadding == null
            ? `-${borderWidth}`
            : `calc(0px - ${borderPaddingLeft} - ${borderWidth})`,
        right:
          borderPadding == null
            ? `-${borderWidth}`
            : `calc(0px - ${borderPaddingRight} - ${borderWidth})`,
      },
    },
  };
};

export default getBorderFocusStyles;
