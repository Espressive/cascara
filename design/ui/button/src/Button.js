import React from 'react';
import types from 'prop-types';
import { Button as SUIButton } from 'semantic-ui-react';
import styles from './Button.module.css';

const propTypes = {
  /** Main content of the button */
  content: types.string.isRequired,
  /** Makes the button take the width of the parent container */
  fluid: types.bool,
  /** Sets the color type of the button to follow the theme brand color */
  isBrandColor: types.bool,
  /** Indicates the outcome of clicking the button ('positive', 'negative') */
  outcome: types.oneOf('positive', 'negative'),
};

const Button = ({
  content = 'Default Content',
  fluid = false,
  isBrandColor = false,
  outcome,
}) => {
  return (
    <SUIButton
      basic={!outcome}
      className={styles._}
      content={content}
      fluid={fluid}
      negative={outcome === 'negative'}
      positive={outcome === 'positive'}
    />
  );
};

Button.propTypes = propTypes;

export { Button };
