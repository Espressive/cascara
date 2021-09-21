import React from 'react';
import pt from 'prop-types';

const propTypes = {
  isMinimal: pt.bool,
};

const TemporaryLoading = ({ isMinimal }) => (
  <div
    className={isMinimal ? 'ui loading basic segment' : 'ui loading segment'}
    style={
      isMinimal
        ? {
            height: '4em',
          }
        : { height: '10em' }
    }
  />
);

TemporaryLoading.propTypes = propTypes;

export default TemporaryLoading;
