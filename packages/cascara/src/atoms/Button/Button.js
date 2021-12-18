import classNames from 'classnames';
import pt from '@espressive/prop-types';
import React, { forwardRef } from 'react';
import { Button as ReakitButton } from 'reakit';
import { InlineIcon } from '@iconify/react';
import { getSafeLinkRel } from '../../lib/linkUtils';
// import styles from './Button.module.scss';

const cx = classNames;

const propTypes = {
  /** Can render as a different tag or component */
  as: pt.oneOfType([pt.string, pt.elementType]),
  /** Main content of the button */
  content: pt.string,
  /** Makes the button take the width of the parent container */
  fluid: pt.string,
  // An SVG Object, which will override the content
  icon: pt.shape({}),
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
      icon,
      isBrandColor = false,
      outcome,
      size = 'regular',
      ...rest
    },
    ref
  ) => {
    // Leaving this here for when we decide to run our own styles
    // const internalClassName = cx(rest.className, {
    //   _: true,
    //   basic: !outcome,
    //   fluid: fluid,
    //   large: size === 'large',
    //   negative: outcome === 'negative',
    //   positive: outcome === 'positive',
    //   small: size === 'small',
    // });

    const legacyClassname = cx(rest.className, {
      basic: !outcome,
      fluid: fluid,
      icon: icon,
      large: size === 'large',
      negative: outcome === 'negative',
      positive: outcome === 'positive',
      small: size === 'small',
      'ui button': true,
    });

    // FDS-137: use action name for button name if no content is specified
    const buttonText = content || rest.name;

    return (
      <ReakitButton
        {...rest}
        as={as}
        className={legacyClassname}
        ref={ref}
        rel={getSafeLinkRel(rest)}
      >
        {icon ? <InlineIcon icon={icon} /> : buttonText}
      </ReakitButton>
    );
  }
);
Button.propTypes = propTypes;

export default Button;
