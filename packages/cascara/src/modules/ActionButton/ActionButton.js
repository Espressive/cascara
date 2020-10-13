import React, { useContext } from 'react';
import { ModuleContext } from '../context';
import { Button } from 'semantic-ui-react';

const ActionButton = ({
  content = 'ActionButton',
  isLabeled = false,
  label,
  ...rest
}) => {
  const { isEditing } = useContext(ModuleContext);

  // we need to mute the SUIR prop
  const buttonLabel = isLabeled ? content || label : null;

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('ActionButton: handleClick()');
  };

  return isEditing ? null : (
    <Button
      basic
      content={content}
      onClick={handleClick}
      {...rest}
      label={buttonLabel}
    />
  );
};

export default ActionButton;
