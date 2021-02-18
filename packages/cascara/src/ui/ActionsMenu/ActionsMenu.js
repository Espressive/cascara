import pt from 'prop-types';
import React, { useLayoutEffect, useRef } from 'react';
import { Button } from 'reakit/Button';
import { Menu, MenuButton, MenuItem, useMenuState } from 'reakit/Menu';
import styles from './ActionsMenu.module.scss';

import { popperOverTrigger } from '../../shared/popperModifiers';

const DEFAULT_TRIGGER = (
  <Button className='ui basic icon button'>
    <b>⋯</b>
  </Button>
);
// const DEFAULT_TRIGGER = <p>'Trigger'</p>;

const propTypes = {
  actions: pt.arrayOf(pt.object).isRequired,
};

const ActionsMenu = ({ trigger = DEFAULT_TRIGGER, actions }) => {
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

  const onItemClick = (item) => {
    menu.hide();
    item.onClick();
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
          {actions.map(({ content, ...rest }) => (
            <MenuItem
              {...menu}
              {...rest}
              as='div'
              className={'item ' + styles.ActionsMenuItem}
              key={content}
              onClick={() => onItemClick(rest)}
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
