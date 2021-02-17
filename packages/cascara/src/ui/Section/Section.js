import React from 'react';
import styles from './Section.module.scss';

const Section = ({ header, children, footer }) => {
  return (
    <section className={styles._}>
      {header && <header className={styles.Header}>{header}</header>}
      <div className={styles.Content}>{children}</div>
      {footer && <footer className={styles.Footer}>{footer}</footer>}
    </section>
  );
};

export default Section;
