import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';

import styles from './Section.module.scss';
import classnames from 'classnames/bind';

const propTypes = {
  as: pt.string,
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  footer: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  header: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
};

const cx = classnames.bind(styles);

const Section = ({ as = 'section', children, footer, header, ...rest }) => {
  return (
    <Role {...rest} as={as} className={cx('_', rest.className)}>
      {header && <header className={styles.Header}>{header}</header>}
      <div className={styles.Content}>{children}</div>
      {footer && <footer className={styles.Footer}>{footer}</footer>}
    </Role>
  );
};

Section.propTypes = propTypes;

export default Section;
