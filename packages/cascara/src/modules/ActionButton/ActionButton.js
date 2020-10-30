import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'semantic-ui-react';

const propTypes = {
  content: pt.string,
  isLabeled: pt.bool,
  label: pt.string,
  name: pt.string,
};

const ActionButton = ({
  content = 'ActionButton',
  isLabeled = false,
  label,
  name,
  ...rest
}) => {
  const { isEditing, onAction, record } = useContext(ModuleContext);

  // we need to mute the SUIR prop
  const buttonLabel = isLabeled ? content || label : null;

  const handleClick = ({ currentTarget }) => {
    onAction(currentTarget, record);
  };

  return isEditing ? null : (
    <Button
      basic
      content={content}
      onClick={handleClick}
      {...rest}
      label={buttonLabel}
      name={name}
      type='button'
    />
  );
};

ActionButton.propTypes = propTypes;

export { propTypes };
export default ActionButton;
