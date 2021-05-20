import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { getBorderFocusStyles, pxToRem } from '../../../utils';

const transparentColorStyle = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: 'transparent',
};

const transparentColorStyleObj = {
  ...transparentColorStyle,
  ':hover': transparentColorStyle,
  ':active': transparentColorStyle,
  ':focus': {
    ...transparentColorStyle,
    ':active': transparentColorStyle,
  },
};

const getWidth = (p, v) => {
  if (p.fluid) {
    return '100%';
  }

  if (p.inline) {
    return 'initial';
  }

  return v.width;
};

export const dropdownStyles = {
  root: ({ props: p }) => ({
    ...(p.inline && { display: 'inline-flex' }),
  }),

  clearIndicator: ({ variables: v, theme: { siteVariables } }) => ({
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    margin: 0,
    position: 'absolute',
    right: pxToRem(6),
    padding: pxToRem(2),
    color: v.color,

    ...getBorderFocusStyles({ variables: siteVariables }),
  }),

  container: ({ props: p, variables: v, theme: { siteVariables } }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: v.borderColor,
    outline: 0,
    width: getWidth(p, v),
    borderWidth: p.search
      ? `0 0 ${v.searchBorderBottomWidth} 0`
      : v.borderWidth,
    color: v.color,
    backgroundColor: v.backgroundColor,
    borderRadius: v.containerBorderRadius,
    ...(p.open &&
      p.position === 'above' && {
        borderRadius: v.openAboveContainerBorderRadius,
      }),
    ...(p.open &&
      p.position === 'below' && {
        borderRadius: v.openBelowContainerBorderRadius,
      }),

    ':hover': {
      backgroundColor: v.backgroundColorHover,
      borderColor: v.borderColorHover,

      ...(p.open && {
        borderColor: v.openBorderColorHover,
      }),
    },
    ...(p.error && {
      border: `${pxToRem(1)} solid ${v.borderError}`,
      ':hover': { border: `${pxToRem(1)} solid ${v.borderError}` },
    }),
    ':active': {
      backgroundColor: v.backgroundColor,
    },
    ':focus-within': {
      // when dropdown's selected items are focused
      // keep the focus border style
      borderBottomColor: v.borderColorFocus,
    },
    ...(p.focused && {
      backgroundColor: v.backgroundColor,
      ...(p.search && {
        borderBottomColor: v.borderColorFocus,
      }),
      ...(!p.search &&
        !p.open &&
        p.isFromKeyboard &&
        getBorderFocusStyles({ variables: siteVariables })[':focus-visible']),
    }),
    ...(p.inline && {
      ...transparentColorStyleObj,
      alignItems: 'center',
    }),
    ...(p.inverted && {
      backgroundColor: v.invertedBackgroundColor,
      ':hover': {
        backgroundColor: v.invertedBackgroundColorHover,
      },
      ':active': {
        backgroundColor: v.invertedBackgroundColorHover,
      },
      ':focus': {
        backgroundColor: v.invertedBackgroundColorHover,
      },
    }),

    ...(p.disabled && {
      backgroundColor: siteVariables.colorScheme.default.backgroundDisabled,
      borderColor: siteVariables.colorScheme.default.borderDisabled,
      userSelect: 'none',

      ':hover': {
        backgroundColor: siteVariables.colorScheme.default.backgroundDisabled,
      },

      ':active': {
        backgroundColor: siteVariables.colorScheme.default.backgroundDisabled,
      },
    }),

    [`& .${dropdownSlotClassNames.triggerButton}`]: {
      ...(p.disabled && {
        color: siteVariables.colorScheme.default.foregroundDisabled,
      }),
    },
  }),

  selectedItems: ({ props: p, variables: v }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    maxHeight: v.selectedItemsMaxHeight,

    '& .ui-button': {
      textTransform: 'none',
    },

    width: '100%',
    ...(p.hasToggleIndicator && { paddingRight: v.toggleIndicatorSize }),
    ...(p.multiple &&
      p.hasItemsSelected && {
        paddingTop: pxToRem(1),
        paddingBottom: pxToRem(4),
      }),
  }),

  triggerButton: ({ props: p, variables: v }) => {
    return {
      overflow: 'hidden',
      boxShadow: 'none',
      minHeight: pxToRem(32),
      ...transparentColorStyleObj,
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton,
      ...(p.multiple && {
        minWidth: 0,
        flex: 1,
        ...(p.hasItemsSelected && {
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          height: '100%',
        }),
      }),
      ...transparentColorStyleObj,
      ':focus': {
        color: v.color,
        ...transparentColorStyleObj,
      },
      ':focus-visible': {
        color: v.color,
        ...transparentColorStyle,
        ':after': {
          borderColor: 'transparent',
          borderRightWidth: 0,
        },
        ':before': {
          borderColor: 'transparent',
          borderRightWidth: 0,
        },
      },
      ':active': {
        color: v.color, // required for HC theme
        ...transparentColorStyle,
        animationName: 'unset',
        animationDuration: 'unset',
      },
      ':hover': {
        ...transparentColorStyle,
        color: v.color, // required for HC theme
      },
      ...(p.inline && {
        paddingLeft: 0,
        paddingRight: 0,
        width: 'initial',
      }),
    };
  },

  list: ({ props: p, variables: v }) => ({
    outline: 0,
    borderStyle: 'solid',
    borderWidth: p.open ? v.listBorderWidth : '0px',
    borderColor: v.listBorderColor,
    zIndex: v.overlayZIndex,
    maxHeight: v.listMaxHeight,
    overflowY: 'auto',
    width: getWidth(p, v),
    background: v.listBackgroundColor,
    ...(p.position === 'above' && { borderRadius: v.aboveListBorderRadius }),
    ...(p.position === 'below' && { borderRadius: v.belowListBorderRadius }),
    ...(p.open && {
      boxShadow: v.listBoxShadow,
      padding: v.listPadding,
    }),
  }),

  loadingMessage: ({ variables: v }) => ({
    backgroundColor: v.loadingMessageBackgroundColor,
  }),

  noResultsMessage: ({ variables: v }) => ({
    backgroundColor: v.noResultsMessageBackgroundColor,
  }),

  headerMessage: ({ variables: v }) => ({
    backgroundColor: v.headerMessageBackgroundColor,
  }),

  toggleIndicator: ({ props: p, variables: v }) => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',

    cursor: 'pointer',
    ...(p.disabled && {
      cursor: 'default',
    }),
    userSelect: 'none',

    margin: 0,
    position: 'absolute',
    right: pxToRem(8),
    ...(p.multiple &&
      p.hasItemsSelected && {
        top: pxToRem(8),
      }),

    color: v.color,
    ...(p.disabled && { color: v.disabledColor }),
  }),
};
