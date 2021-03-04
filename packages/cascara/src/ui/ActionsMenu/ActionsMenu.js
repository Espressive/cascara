import pt from 'prop-types';
import React, { useContext, useRef } from 'react';
import { Menu, MenuButton, MenuItem, useMenuState } from 'reakit/Menu';
import { Button } from 'reakit/Button';

import styles from './ActionsMenu.module.scss';
import { popperOverTrigger } from '../../shared/popperModifiers';
import { ModuleContext } from '../../modules/context';

const DEFAULT_TRIGGER = (
  <Button className='ui basic icon button'>
    <b>⋯</b>
  </Button>
);

const propTypes = {
  actions: pt.arrayOf(pt.object).isRequired,
  trigger: pt.element,
};

const ActionsMenu = ({ trigger = DEFAULT_TRIGGER, actions }) => {
  const { onAction, record } = useContext(ModuleContext);

  // Set a ref on our trigger to pass into the disclosure and also measure clientHeight
  const triggerRef = useRef();

  const menu = useMenuState({
    // This MUST be modal: true in order to render in a portal or else we
    // will have problems with any menus rendered inside of positioned
    // elements other than "relative"
    modal: true,
    placement: 'bottom-end',
    preventBodyScroll: true,
    unstable_popperModifiers: [popperOverTrigger],
  });

  const handleMenuItemClick = (item) => {
    menu.hide();

    if (onAction) {
      onAction(item, record);
    }
  };

  return (
    <>
      <MenuButton {...menu} {...trigger.props} ref={triggerRef}>
        {(disclosureProps) => React.cloneElement(trigger, disclosureProps)}
      </MenuButton>
      <Menu
        {...menu}
        aria-label='Actions Menu'
        className={`ui dropdown active visible ${styles.ActionsMenu}`}
        tabIndex={0}
      >
        <div
          className='menu transition visible'
          style={{ position: 'initial' }}
        >
          {actions.map(
            ({ actionName, content, isLabeled, ...rest }, actionIndex) => {
              // FDS-137: use action name for button name if no content is specified
              const buttonText = content || rest.name;
              const key = `action.${actionIndex}-${rest.name}.${content}`;

              return (
                <MenuItem
                  {...menu}
                  {...rest}
                  as='div'
                  className={`item ${styles.ActionsMenuItem}`}
                  key={key}
                  // eslint-disable-next-line react/jsx-no-bind -- rest needs to be passed, hence the in-situ arrow function
                  onClick={() => handleMenuItemClick(rest)}
                >
                  {buttonText}
                </MenuItem>
              );
            }
          )}
        </div>
      </Menu>
    </>
  );
};

ActionsMenu.propTypes = propTypes;

export default ActionsMenu;
