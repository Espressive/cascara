import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'reakit';

const propTypes = {
  /** Every action can have a name */
  actionName: pt.string,
  /** Presents the button without a label. NOT USER CONFIGURABLE */
  isLabeled: pt.bool,
  /** An action needs to have a unique label relative to its context */
  label: pt.string,
};

const ActionButton = ({
  actionName,
  isLabeled = false,
  label = 'ActionButton',
  ...rest
}) => {
  const { isEditing, onAction, record } = useContext(ModuleContext);
  const { content = label, ...restWithoutLabel } = rest;

  //
  // initially, this was called actionName, but now we ...spread
  // all props into the button. So the correct way of calling it
  // is just 'name'.
  //
  // This is a breaking change. in order to prevent any breakage
  // in the our Apps, we are temporarily deriving it from one if
  // the other is not passed. Once we have the resources to go
  // and update our Apps we will revisit.
  const name = actionName || rest.name;

  // FDS-137: use action name for button name if no content is specified
  const buttonText = content || name;

  const handleClick = ({ currentTarget }) => {
    onAction(currentTarget, record);
  };

  return isEditing ? null : (
    <Button
      {...restWithoutLabel}
      className='ui basic button'
      name={name}
      onClick={handleClick}
      type='button'
    >
      {buttonText}
    </Button>
  );
};

ActionButton.propTypes = propTypes;

export { propTypes };
export default ActionButton;
