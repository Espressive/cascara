import React from 'react';
import pt from 'prop-types';
import { MenuButton } from 'reakit';
import { Icon } from '@iconify/react';
import { styles } from './';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  iconClosed: pt.object,
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  iconOpen: pt.object,
};

const HeaderMenuButton = ({ iconClosed, iconOpen, ...rest }) => (
  <MenuButton {...rest} className={styles.HeaderMenuButton} type='button'>
    {/* We are taking "visible" from Reakit useMenu state props */}
    <Icon icon={rest.visible ? iconOpen : iconClosed} width={30} />
  </MenuButton>
);
HeaderMenuButton.propTypes = propTypes;

export default HeaderMenuButton;
