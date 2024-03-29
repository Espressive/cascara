import pt from 'prop-types';
import { PROP_TYPES as TitlePT } from '../../atoms/Title/__globals';

export const PROP_TYPES = {
  /** HTML tag to allow polymorphism */
  as: pt.string,

  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  /** optionally render with no padding and no border */
  isBasic: pt.bool,
  ...TitlePT,
};

export const DEFAULT_AS_TAG = 'section';
