import React from 'react';
import types from 'prop-types';
import { Button as SUIButton } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import styles from './EspButton.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /** Main content of the button */
  content: types.string.isRequired,
  /** Makes the button take the width of the parent container */
  fluid: types.bool,
  /** Sets the color type of the button to follow the theme brand color */
  isBrandColor: types.bool,
  /** Indicates the outcome of clicking the button ('positive', 'negative') */
  outcome: types.oneOf('positive', 'negative')
};

const EspButton = ({
  content = 'Default Content',
  fluid = false,
  isBrandColor = false,
  outcome
}) => {
  const className = cx({
    root: true,
    basic: !outcome,
    fluid: fluid,
    negative: outcome === 'negative',
    positive: outcome === 'positive'
  });

  return (
    <SUIButton
      basic={!outcome}
      className={className}
      content={content}
      fluid={fluid}
      negative={outcome === 'negative'}
      positive={outcome === 'positive'}
    />
  );
};

EspButton.propTypes = propTypes;

export { EspButton };
