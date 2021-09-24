import React, { memo } from 'react';
import { ACTION_STACK_PROP_TYPES, DEFAULT_TRIGGER } from './__globals';
import { popperOverTrigger } from '../../lib/popperModifiers';
import DropdownStackItem from './DropdownStackItem';
import { Menu, MenuButton, useMenuState } from 'reakit/Menu';
import styles from './Dropdown.module.scss';

const MemoizedDropdownItem = memo(DropdownStackItem);

const propTypes = ACTION_STACK_PROP_TYPES;

const DropdownStack = ({
  actions,
  dropdownLabel = 'Actions',
  isInitialOpen = false,
  placement = 'bottom-end',
  trigger = DEFAULT_TRIGGER,
}) => {
  const menuState = useMenuState({
    // This MUST be modal: true in order to render in a portal or else we
    // will have problems with any menus rendered inside of positioned
    // elements other than "relative"
    modal: true,
    placement,
    preventBodyScroll: true,
    unstable_popperModifiers: [popperOverTrigger],
    visible: isInitialOpen,
  });

  return actions && actions.length > 0 ? (
    <>
      <MenuButton {...menuState} {...trigger.props}>
        {(disclosureProps) => React.cloneElement(trigger, disclosureProps)}
      </MenuButton>
      <Menu {...menuState} aria-label={dropdownLabel} className={styles.Menu}>
        {actions?.map((action, i) => (
          <MemoizedDropdownItem
            {...menuState}
            {...action}
            className={styles.Item}
            key={action.label + i}
          >
            {action.label}
          </MemoizedDropdownItem>
        ))}
      </Menu>
    </>
  ) : null;
};

DropdownStack.propTypes = propTypes;

export default DropdownStack;
