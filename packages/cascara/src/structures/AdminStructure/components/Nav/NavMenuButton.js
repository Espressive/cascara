import React from 'react';
import pt from 'prop-types';
import { Disclosure } from 'reakit';
import styles from './Nav.module.scss';
import { Icon } from '@iconify/react';
import Flex from '../../../../atoms/Flex';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  icon: pt.object,
  label: pt.string,
};

const NavMenuButton = ({ label = 'Menu', icon, ...rest }) => {
  const disclosureStyle = icon ? { display: 'flex' } : {};
  return (
    <Disclosure
      className={styles.NavMenuButton}
      style={disclosureStyle}
      {...rest}
    >
      {icon ? (
        <Flex space='start' vAlign='center'>
          {icon && (
            <div>
              <Icon className='icon' icon={icon} inline width={18} />
            </div>
          )}
          <span className='label'>{label}</span>
        </Flex>
      ) : (
        label
      )}
    </Disclosure>
  );
};

NavMenuButton.propTypes = propTypes;

export default NavMenuButton;
