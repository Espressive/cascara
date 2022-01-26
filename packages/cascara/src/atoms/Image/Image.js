import React, { forwardRef } from 'react';
import pt from 'prop-types';
import styles from './Image.module.scss';

const propTypes = {
  // Explicitly marking this prop as required for accessibility
  alt: pt.string.isRequired,
  // Image src attribute
  src: pt.string.isRequired,
};

// No other props are typed as the rest of Image is React's top level API for an img tag
const Image = forwardRef(({ alt, src, ...rest }, ref) => {
  // Making sure we do not mute any className that is being passed into the component
  const classList = [styles._, rest.className];

  return (
    <img
      {...rest}
      alt={alt}
      className={classList.join(' ')}
      ref={ref}
      src={src}
    />
  );
});

Image.displayName = 'Image';
Image.propTypes = propTypes;

export default Image;
