import React from 'react';
import pt from 'prop-types';

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
      <div className={styles.Content}>{children}</div>
      {footer && <footer className={styles.Footer}>{footer}</footer>}
    </section>
  );
};

Section.propTypes = propTypes;

export { propTypes };
export default Section;
