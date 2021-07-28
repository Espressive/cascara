import pt from 'prop-types';
import React, { useCallback, useContext } from 'react';
import { MenuItem } from 'reakit/Menu';

import styles from './ActionsMenu.module.scss';
import { ModuleContext } from '../../modules/context';

const propTypes = {
  actionIndex: pt.number,
  actionName: pt.string,
  content: pt.string,
  isLabeled: pt.bool,
  menu: pt.shape({
    hide: pt.func,
    modal: pt.bool,
    placement: pt.string,
    preventBodyScroll: pt.boolean,
    unstable_popperModifiers: pt.arrayOf(
      pt.shape({
        name: pt.string,
        options: pt.shape({
          offset: pt.func,
        }),
      })
    ),
  }),
};

const ActionsMenuItem = ({
  actionIndex,
  actionName,
  content,
  isLabeled,
  menu,
  ...rest
}) => {
  const { onAction, record } = useContext(ModuleContext);

  // FDS-137: use action name for button name if no content is specified
  const buttonText = content || rest.name;
  const key = `action.${actionIndex}-${rest.name}.${content}`;

  const handleMenuItemClick = useCallback(() => {
    menu.hide();

    if (onAction) {
      onAction({ actionName, content, isLabeled, ...rest }, record);
    }
  }, [actionName, content, isLabeled, menu, onAction, record, rest]);

  return (
    <MenuItem
      {...menu}
      {...rest}
      as='div'
      className={`item ${styles.ActionsMenuItem}`}
      key={key}
      onClick={handleMenuItemClick}
    >
      {buttonText}
    </MenuItem>
  );
};

ActionsMenuItem.propTypes = propTypes;

export default ActionsMenuItem;
