import pt from 'prop-types';
import React, { useContext, useLayoutEffect, useRef } from 'react';
import { Menu, MenuButton, MenuItem, useMenuState } from 'reakit/Menu';

import styles from './ActionsMenu.module.scss';
import { popperOverTrigger } from '../../shared/popperModifiers';
import { ModuleContext } from '../../modules/context';

const propTypes = {
  actions: pt.arrayOf(pt.object).isRequired,
};

const ActionsMenu = ({ trigger, actions }) => {
  const { onAction, record } = useContext(ModuleContext);

  // Set a ref on our trigger to pass into the disclosure and also measure clientHeight
  const triggerRef = useRef();

  useLayoutEffect(() => {
    if (triggerRef.current) {
      // console.warn(window.getComputedStyle(triggerRef.current)['float']);
    }
  });

  const menu = useMenuState({
    modal: true,
    placement: 'bottom-end',
    unstable_popperModifiers: [popperOverTrigger],
  });

  const handleMenuItemClick = (item) => {
    menu.hide();

    onAction(item, record);
  };

  return (
    <>
      <MenuButton {...menu} {...trigger.props} ref={triggerRef}>
        {(disclosureProps) => React.cloneElement(trigger, disclosureProps)}
      </MenuButton>
      <Menu
        {...menu}
        aria-label='Menu'
        className={'ui dropdown active visible ' + styles.ActionsMenu}
        preventBodyScroll
      >
        <div
          className='menu transition visible'
          style={{ position: 'initial' }}
        >
          {actions.map(({ content, isLabeled, ...rest }) => (
            <MenuItem
              {...menu}
              {...rest}
              as='div'
              className={'item ' + styles.ActionsMenuItem}
              key={content}
              onClick={() => handleMenuItemClick(rest)}
              style={{ paddingTop: '.5rem !important' }}
            >
              {content}
            </MenuItem>
          ))}
        </div>
      </Menu>
    </>
  );
};

ActionsMenu.propTypes = propTypes;

export default ActionsMenu;
