import React from 'react';
import pt from 'prop-types';
import { Button } from 'reakit/Button';
import { Icon } from '@iconify/react';
import styles from './HeaderToggle.module.scss';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  iconClosed: pt.object,
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  iconOpen: pt.object,
};

const HeaderToggle = ({ iconClosed, iconOpen, ...rest }) => {
  const isOpen = true;
  return (
    <Button {...rest} className={styles.HeaderToggle} type='button'>
      <Icon icon={isOpen ? iconOpen : iconClosed} width={30} />
    </Button>
  );
};

HeaderToggle.propTypes = propTypes;

export default HeaderToggle;
