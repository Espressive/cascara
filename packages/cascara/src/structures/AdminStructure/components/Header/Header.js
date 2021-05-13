import React, { useContext } from 'react';
import pt from 'prop-types';
import { HeaderMenuButton, styles } from './';
import { VisuallyHidden } from 'reakit';
import { AdminContext } from '../../context';
import {
  // baristaIcon,
  drawerIcon,
  drawerOpenIcon,
  menuIcon,
  menuOpenIcon,
} from '@espressive/icons';

const TestLogo =
  'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png';

const propTypes = {
  logo: pt.string,
  title: pt.oneOfType([pt.arrayOf(pt.node), pt.node]).isRequired,
};

const disabled = false;

const Header = ({ logo = TestLogo, title }) => {
  const { menuDrawer, menuNav, isSizeMedium } = useContext(AdminContext);
  return (
    <div className={styles.Header}>
      {disabled && isSizeMedium && (
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
      {disabled && (
        <HeaderMenuButton
          {...menuDrawer}
          iconClosed={drawerIcon}
          iconOpen={drawerOpenIcon}
          style={{ marginLeft: 'auto' }}
        />
      )}
    </div>
  );
};

Header.propTypes = propTypes;
Header.displayName = 'AdminStructure.Header';

export default Header;
