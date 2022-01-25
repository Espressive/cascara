import React, { useCallback } from 'react';
import pt from 'prop-types';
import { MenuItem } from 'reakit/Menu';

const propTypes = {
  handler: pt.func,
  hide: pt.func.isRequired,
  // Deprecated and will be removed in a future release
  onClick: pt.func,
};

const DropdownStackItem = ({ hide, onClick, handler, ...rest }) => {
  const handleOnClick = useCallback(() => {
    // This is the onClick function passed to the action
    if (handler) {
      handler();
    } else {
      onClick();
    }

    // This is the hide() function from the Reakit state hook,
    // which we call so the action menu hides after the item is clicked
    hide();
  }, [hide, onClick, handler]);

  return <MenuItem {...rest} onClick={handleOnClick} />;
};

DropdownStackItem.propTypes = propTypes;

export default DropdownStackItem;
