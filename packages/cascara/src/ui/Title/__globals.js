import pt from 'prop-types';

export const PROP_TYPES = {
  // The title string
  title: pt.string,
  // as to allow polim
  titleAs: pt.string,
  // Content can show before the title
  titlePost: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  // Content can show after the title
  titlePre: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  // A title can have sub content
  titleSub: pt.string,
};

export const DEFAULT_AS_TAG = 'h3';
