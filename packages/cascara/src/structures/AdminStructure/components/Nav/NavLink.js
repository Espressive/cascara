import React from 'react';
import pt from 'prop-types';
import { Button } from 'reakit';
import { Icon } from '@iconify/react';
import styles from './Nav.module.scss';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  icon: pt.object,
  label: pt.string.isRequired,
  linkComponent: pt.shape({
    // Kind of a hack, but making sure that there is a render function
    // on the link component being passed so we know it is supposed to render
    render: pt.func,
  }),
  // eslint-disable-next-line react/forbid-prop-types -- Could be anything
  linkComponentProps: pt.object,
};

const NavLink = ({
  icon,
  label = 'NavLink',
  linkComponent = 'a',
  linkComponentProps,
  ...rest
}) => (
  <Button
    {...rest}
    {...linkComponentProps}
    as={linkComponent}
    className={styles.NavLink}
  >
    {icon && <Icon className='icon' icon={icon} inline width={18} />}
    <span className='label'>{label}</span>
  </Button>
);

NavLink.propTypes = propTypes;

export default NavLink;
