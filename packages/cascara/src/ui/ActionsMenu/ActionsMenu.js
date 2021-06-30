import pt from 'prop-types';
import React, { useRef } from 'react';
import { Menu, MenuButton, useMenuState } from 'reakit/Menu';
import { Button } from 'reakit/Button';
import { InlineIcon } from '@iconify/react';
import { verticalmenuIcon } from '@espressive/icons';

import ActionsMenuItem from './ActionsMenuItem';
import styles from './ActionsMenu.module.scss';
import { popperOverTrigger } from '../../shared/popperModifiers';

const MemoActionsMenuItem = React.memo(ActionsMenuItem);
const DEFAULT_TRIGGER = (
  <Button className='ui basic icon button'>
    <InlineIcon icon={verticalmenuIcon} />
  </Button>
);

const propTypes = {
  actions: pt.arrayOf(pt.object).isRequired,
  trigger: pt.node,
};

const ActionsMenu = ({ trigger = DEFAULT_TRIGGER, actions }) => {
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
          {actions.map((action, actionIndex) => (
            <MemoActionsMenuItem
              key={action.name}
              {...action}
              actionIndex={actionIndex}
              menu={menu}
            />
          ))}
        </div>
      </Menu>
    </>
  );
};

ActionsMenu.propTypes = propTypes;

export default ActionsMenu;
