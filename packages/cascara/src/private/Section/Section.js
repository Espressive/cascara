import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';

import styles from './Section.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  footer: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  header: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
};

const Section = ({ children, footer, header }) => {
  return (
    <section className={styles._}>
      {header && <header className={styles.Header}>{header}</header>}
      <Role className={styles.Content}>{children}</Role>
      {footer && <footer className={styles.Footer}>{footer}</footer>}
    </section>
  );
};

Section.propTypes = propTypes;

export default Section;
