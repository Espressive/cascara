import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'reakit';

const propTypes = {
  actionName: pt.string,
  isLabeled: pt.bool,
  label: pt.string,
};

const ActionButton = ({
  isLabeled = false,
  label = 'ActionButton',
  actionName,
  ...rest
}) => {
  const { isEditing, onAction, record } = useContext(ModuleContext);

  const handleClick = ({ currentTarget }) => {
    onAction(currentTarget, record);
  };

  return isEditing ? null : (
    <Button
      {...rest}
      className='ui basic button'
      name={actionName}
      onClick={handleClick}
      type='button'
    >
      {label}
    </Button>
  );
};

ActionButton.propTypes = propTypes;

export { propTypes };
export default ActionButton;
