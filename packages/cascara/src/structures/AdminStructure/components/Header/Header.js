import React, { useContext } from 'react';
import pt from 'prop-types';
import HeaderMenuButton from './HeaderMenuButton';
import Flex from '../../../../atoms/Flex';
import styles from './Header.module.scss';
import { VisuallyHidden } from 'reakit';
import { AdminContext } from '../../context';
import {
  // baristaIcon,
  drawerIcon,
  drawerOpenIcon,
  menuIcon,
  menuOpenIcon,
} from '@espressive/icons';

const propTypes = {
  logo: pt.string,
  post: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  title: pt.string.isRequired,
};

const disabled = false;

const Header = ({ logo, title, post, ...rest }) => {
  const { menuDrawer, menuNav, isSizeMedium } = useContext(AdminContext);
  return (
    <Flex {...rest} className={styles.Header} vAlign='center'>
      {disabled && isSizeMedium && menuNav && (
        <HeaderMenuButton
          {...menuNav}
          iconClosed={menuOpenIcon}
          iconOpen={menuIcon}
        />
      )}
      <a className={styles.Company} href={process.env.PUBLIC_URL || '/'}>
        {logo ? (
          <>
            <VisuallyHidden>
              <h1>{title}</h1>
            </VisuallyHidden>
            <img alt={title} className={styles.Logo} src={logo} />
          </>
        ) : (
          <h1 className={styles.Title}>{title}</h1>
        )}
      </a>
      {post && <Flex.Item push>{post}</Flex.Item>}
      {disabled && menuDrawer && (
        <HeaderMenuButton
          {...menuDrawer}
          iconClosed={drawerIcon}
          iconOpen={drawerOpenIcon}
          style={{ marginLeft: 'auto' }}
        />
      )}
    </Flex>
  );
};

Header.propTypes = propTypes;
Header.displayName = 'AdminStructure.Header';

export default Header;
