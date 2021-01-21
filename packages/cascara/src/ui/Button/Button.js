import classNames from 'classnames/bind';
import pt from 'prop-types';
import React, { forwardRef } from 'react';
import { Button as ReakitButton } from 'reakit';
import { getSafeLinkRel } from '../../shared/linkUtils';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /** Can render as a different tag or component */
  as: pt.oneOfType([pt.string, pt.elementType]),
  /** Main content of the button */
  content: pt.string,
  /** Makes the button take the width of the parent container */
  fluid: pt.bool,
  /** Sets the color type of the button to follow the theme brand color */
  isBrandColor: pt.bool,
  /** Indicates the outcome of clicking the button ('positive', 'negative') */
  outcome: pt.oneOf(['positive', 'negative']),
  /** A button can have multiple sizes */
  size: pt.oneOf(['small', 'regular', 'large']),
};

// We are going to need a utility to help us dealing with refs. When a composable `as`
// prop is being used with a React component, we need to pass the ref directly to
// Reakit. Otherwise, we need to use React.forwardRef()

const Button = forwardRef(
  (
    {
      as = 'button',
      content = 'Default Content',
      fluid = false,
      isBrandColor = false,
      outcome,
      size = 'regular',
      ...rest
    },
    ref
  ) => {
    const internalClassName = cx(rest.className, {
      _: true,
      basic: !outcome,
      fluid: fluid,
      large: size === 'large',
      negative: outcome === 'negative',
      positive: outcome === 'positive',
      small: size === 'small',
    });

    return (
      <ReakitButton
        {...rest}
        as={as}
        className={internalClassName}
        ref={ref}
        rel={getSafeLinkRel(rest)}
      >
        {content}
      </ReakitButton>
    );
  }
);
Button.propTypes = propTypes;

export default Button;
