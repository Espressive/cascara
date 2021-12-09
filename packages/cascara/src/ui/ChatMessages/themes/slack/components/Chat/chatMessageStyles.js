import { isNil } from 'lodash';
import { chatMessageSlotClassNames } from '@fluentui/react-northstar';
import {
  getBorderFocusStyles,
  pxToRem,
  screenReaderContainerStyles,
} from '../../../utils';

export const chatMessageStyles = {
  root: ({ props: p, variables: v, theme: { siteVariables } }) => ({
    display: 'inline-block',
    position: 'relative',

    marginLeft: 0,
    marginRight: v.offset,
    maxWidth: `calc(100% - ${v.offset})`,
    minWidth: v.offset,

    border: v.border,
    outline: 0,

    color: v.color,

    wordBreak: 'break-word',
    wordWrap: 'break-word',

    ...((v.hasMention || v.isImportant) && {
      '::before': {
        content: '""',
        backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: pxToRem(3),
        borderBottomLeftRadius: 'inherit',
        borderTopLeftRadius: 'inherit',
      },
    }),

    ...getBorderFocusStyles({ variables: siteVariables }),

    // actions menu's appearance can be controlled by the value of showActionMenu variable - in this
    // case this variable will serve the single source of truth on whether actions menu should be shown.
    // Otherwise, if the variable is not provided, the default appearance logic will be used for actions menu.
    ...(isNil(v.showActionMenu) && {
      ':hover': {
        [`> .${chatMessageSlotClassNames.actionMenu}`]: {
          opacity: 1,
          zIndex: v.overlayZIndex,
          '[data-popper-escaped]': {
            opacity: 0,
          },
        },
      },
    }),
  }),

  actionMenu: ({ props: p, variables: v }) => ({
    backgroundColor: v.backgroundColor,
    border: '1px solid',
    borderColor: v.reactionGroupBorderColor,
    borderRadius: v.borderRadius,
    boxShadow: v.actionMenuBoxShadow,
    // we need higher zIndex for the action menu in order to be displayed above the focus border of the chat message
    zIndex: p.focused || !isNil(v.showActionMenu) ? v.overlayZIndex : -1,
    ...(isNil(v.showActionMenu) && {
      overflow: p.focused ? 'visible' : 'hidden',
      // hide and squash actions menu to prevent accidental hovers over its invisible area
      opacity: p.focused ? 1 : 0,
      width: 'auto',
    }),

    ...(!isNil(v.showActionMenu) && {
      overflow: v.showActionMenu ? 'visible' : 'hidden',
      // opacity should always be preferred over visibility in order to avoid accessibility bugs in
      // JAWS behavior on Windows
      opacity: v.showActionMenu ? 1 : 0,
      width: v.showActionMenu ? 'auto' : 0,
    }),

    '[data-popper-escaped]': {
      opacity: 0,
    },
  }),

  author: ({ props: p, variables: v }) => ({
    ...((p.attached === 'bottom' || p.attached === true) &&
      screenReaderContainerStyles),
    color: v.authorColor,
    marginRight: v.authorMarginRight,
    fontWeight: v.authorFontWeight,
    fontSize: '1rem',
  }),

  timestamp: ({ props: p, variables: v }) => ({
    marginBottom: v.headerMarginBottom,
    color: 'rgba(97,96,97,1)',
    ...((p.attached === 'bottom' || p.attached === true) &&
      !p.hasReactionGroup &&
      screenReaderContainerStyles),
  }),

  content: ({ props: p, variables: v }) => ({
    color: v.contentColor,
    display: 'block',

    '& a': {
      outline: 'none',
      color: v.linkColor,
      ':focus': {
        textDecoration: 'underline',
      },
    },
    ...(p.hasBadge &&
      p.badgePosition === 'end' && {
        marginRight: pxToRem(4),
      }),
  }),

  badge: ({ props: p, variables: v }) => {
    const sidePosition = p.badgePosition === 'start' ? 'left' : 'right';
    return {
      backgroundColor: v.hasMention
        ? v.hasMentionNubbinColor
        : v.isImportantColor,
      color: v.badgeTextColor,
      boxShadow: v.badgeShadow,
      position: 'absolute',
      padding: pxToRem(4),
      height: 'auto',
      width: 'auto',
      borderRadius: '50%',
      top: pxToRem(4),
      zIndex: v.zIndex,
      [sidePosition]: 0,
      transform:
        p.badgePosition === 'start' ? 'translateX(-50%)' : 'translateX(50%)',
      '& > :first-child': {
        display: 'inline-flex',
      },
    };
  },

  reactionGroup: ({ props: p, variables: v }) => ({
    marginLeft: v.reactionGroupMarginLeft,
    ...(p.hasBadge &&
      p.badgePosition === 'end' && {
        marginRight: pxToRem(2),
      }),
    float: 'right',
  }),
};
