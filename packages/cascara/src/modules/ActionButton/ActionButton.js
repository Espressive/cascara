import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'semantic-ui-react';

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

  // we need to mute the SUIR prop
  const buttonLabel = isLabeled ? label : null;

  const handleClick = ({ currentTarget }) => {
    onAction(currentTarget, record);
  };

  return isEditing ? null : (
    <Button
      basic
      content={label}
      onClick={handleClick}
      {...rest}
      label={buttonLabel}
      name={actionName}
      type='button'
    />
  );
};

ActionButton.propTypes = propTypes;

export { propTypes };
export default ActionButton;
