import React, { useContext } from 'react';
import ModuleContext from '../ModuleContext';
import { Button } from 'semantic-ui-react';

const ActionButton = ({ content = 'ActionButton', ...rest }) => {
  const { isEditing } = useContext(ModuleContext);

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('ActionButton: handleClick()');
  };

  return isEditing ? null : (
    <Button basic content={content} onClick={handleClick} {...rest} />
  );
};

export default ActionButton;
