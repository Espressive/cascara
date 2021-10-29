import React, { useContext } from 'react';
import pt from 'prop-types';
import HeaderMenuButton from './HeaderMenuButton';
import classNames from 'classnames/bind';
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

const cx = classNames.bind(styles);

const propTypes = {
  logo: pt.string,
  post: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  title: pt.string,
};

const disabled = false;

const Header = ({ logo, title, post, ...rest }) => {
  const { menuDrawer, menuNav, isSizeMedium } = useContext(AdminContext);
  return (
    <Flex {...rest} className={cx('Header', rest.className)} vAlign='center'>
      {disabled && isSizeMedium && menuNav && (
        <HeaderMenuButton
          {...menuNav}
          iconClosed={menuOpenIcon}
          iconOpen={menuIcon}
        />
      )}
      <a className={cx('Company')} href={process.env.PUBLIC_URL || '/'}>
        {logo ? (
          <>
            <VisuallyHidden>
              <h1>{title}</h1>
            </VisuallyHidden>
            <img alt={title} className={cx('Logo')} src={logo} />
          </>
        ) : (
          <h1 className={cx('Title')}>{title}</h1>
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
