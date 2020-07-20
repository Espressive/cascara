import React from 'react';
import types from 'prop-types';
import { Button as SUIButton } from 'semantic-ui-react';
import styles from './EspButton.module.css';

const propTypes = {
  content: types.string.isRequired,
  fluid: types.bool,
  isBrandColor: types.bool,
  outcome: types.oneOf('positive', 'negative'),
};

const Hello = ({
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

Hello.propTypes = propTypes;

export default Hello;
