import pt from 'prop-types';

const ACTION_SHAPE = pt.shape({
  label: pt.string,
  onClick: pt.func,
});

export { ACTION_SHAPE };
