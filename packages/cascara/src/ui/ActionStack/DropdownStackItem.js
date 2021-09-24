import React, { useCallback } from 'react';
import pt from 'prop-types';
import { MenuItem } from 'reakit/Menu';

const propTypes = {
  hide: pt.func.isRequired,
  onClick: pt.func.isRequired,
};

const DropdownStackItem = ({ hide, onClick, ...rest }) => {
  const handleOnClick = useCallback(() => {
    // This is the onClick function passed to the action
    onClick();
    // This is the hide() function from the Reakit state hook,
    // which we call so the action menu hides after the item is clicked
    hide();
  }, [hide, onClick]);

  return <MenuItem {...rest} onClick={handleOnClick} />;
};

DropdownStackItem.propTypes = propTypes;

export default DropdownStackItem;
