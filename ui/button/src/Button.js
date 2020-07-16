import React from 'react';
import pt from 'prop-types';
import styles from './Button.module.css';

const Button = ({ greeting, name = 'Default Name' }) => {
  return (
    <button className={styles._}>
      {greeting}, {name}!
    </button>
  );
};

Button.propTypes = {
  /**
   * This is a description for `greeting`.
   */
  greeting: pt.string.isRequired,
  /** This is an inline description for `name`. */
  name: pt.string,
};

export { Button };
