import React, { forwardRef } from 'react';
import pt from 'prop-types';
import classNames from 'classnames/bind';
import { getSafeLinkRel } from '../../../utils/linkUtils.js';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /** Can render as a different tag or component */
  as: pt.oneOfType([pt.string, pt.node]),
  /** Main content of the button */
  content: pt.string.isRequired,
  /** Makes the button take the width of the parent container */
  fluid: pt.bool,
  /** Sets the color type of the button to follow the theme brand color */
  isBrandColor: pt.bool,
  /** Indicates the outcome of clicking the button ('positive', 'negative') */
  outcome: pt.oneOf(['positive', 'negative']),
};

// Need to make sure all of our FDS components use forwardRef()
const Button = forwardRef(
  (
    {
      as = 'button',
      content = 'Default Content',
      fluid = false,
      isBrandColor = false,
      outcome,
      ...rest
    },
    ref
  ) => {
    const className = cx({
      _: true,
      basic: !outcome,
      fluid: fluid,
      negative: outcome === 'negative',
      positive: outcome === 'positive',
    });

    // Maybe later we should add tooling to help us validate that this is
    // either a valid HTML5 tag, or that it is a component. Technically
    // some of that is being done with proptypes.
    const ComponentType = as;

    return (
      	<ComponentType
        ref={ref}
        {...rest}
        className={className}
        rel={getSafeLinkRel(rest)}
      >
        {content}
      </ComponentType>
    );
  }
);

Button.propTypes = propTypes;

export { Button };
