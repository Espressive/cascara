import React from 'react';
import pt from 'prop-types';
import styles from './AdminStructure.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const TestLogo =
  'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png';

const propTypes = {
  logo: pt.node,
  title: pt.oneOfType([pt.arrayOf(pt.node), pt.node]).isRequired,
};

const AdminStructureHeader = ({ logo = TestLogo, title }) => {
  return (
    <div className={styles.Header}>
      <a className={styles.Company} href='/'>
        {logo && <img alt={title} className={styles.Logo} src={logo} />}
        <h1
          className={cx({
            Title: true,
            hidden: logo,
          })}
        >
          {title}
        </h1>
      </a>
    </div>
  );
};

AdminStructureHeader.propTypes = propTypes;
AdminStructureHeader.displayName = 'AdminStructure.Header';

export default AdminStructureHeader;
