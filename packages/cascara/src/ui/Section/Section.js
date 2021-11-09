import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit';
import classNames from 'classnames/bind';

import Title from '../Title';
import { PROP_TYPES as TitlePT } from '../Title/__globals';

import { ALLOWED_TAGS, DEFAULT_AS_TAG } from './__globals';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

// NOTE: propTypes are defined here instead of in ./__globals.js
//       this is because otherwise the props table in Cascara Docs won't show up
const propTypes = {
  /** HTML tag to allow polymorphism */
  as: pt.string,
  /** The section content */
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  /** optionally render with no padding and no border */
  isBasic: pt.bool,
  ...TitlePT,
};

const Section = ({
  as = DEFAULT_AS_TAG,
  isBasic,
  children,
  title,
  titlePost,
  titlePre,
  titleSub,
}) => {
  if (!ALLOWED_TAGS.includes(as)) {
    // eslint-disable-next-line no-console -- we need this as a developer message
    console.warn(
      `${as} is not a valid tag, use one of: [${ALLOWED_TAGS.join(',')}]`
    );
  }

  return (
    <Role
      as={as}
      className={cx('Section', {
        withPaddingAndBorder: !isBasic,
      })}
    >
      {title && (
        <Title
          title={title}
          titlePost={titlePost}
          titlePre={titlePre}
          titleSub={titleSub}
        />
      )}
      {children}
    </Role>
  );
};

Section.propTypes = propTypes;

export { propTypes };
export default Section;
