import React, { useCallback, useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'reakit';

const propTypes = {
  /** DEPRECATED - do not use */
  actionName: pt.string,
  /** Presents the button without a label. NOT USER CONFIGURABLE */
  isLabeled: pt.bool,
  /** An action needs to have a unique label relative to its context */
  label: pt.string,
  /** Every action must have a name */
  name: pt.string,
};

const ActionButton = ({
  actionName,
  isLabeled = false,
  label = 'ActionButton',
  ...rest
}) => {
  const { isEditing, onAction, record } = useContext(ModuleContext);

  // @bje we need to decide if we go for content or label here, both makes no sense
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

  const handleClick = useCallback(
    ({ currentTarget }) => {
      onAction(currentTarget, record);
    },
    [onAction, record]
  );

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
