import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit';
import classNames from 'classnames/bind';

import Boundaries from '../../atoms/Boundaries';
import Title from '../../atoms/Title';
import { PROP_TYPES as TitlePT } from '../../atoms/Title/__globals';

import { DEFAULT_AS_TAG } from './__globals';
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
  titleAs,
  titlePost,
  titlePre,
  titleSub,
  ...rest
}) => (
  <Boundaries>
    <Role
      {...rest}
      as={as}
      className={cx('_', rest.className, {
        isBasic,
      })}
      data-component='Section'
    >
      {title && (
        <Title
          title={title}
          titleAs={titleAs}
          titlePost={titlePost}
          titlePre={titlePre}
          titleSub={titleSub}
        />
      )}
      {children}
    </Role>
  </Boundaries>
);

Section.propTypes = propTypes;

export { propTypes };
export default Section;
