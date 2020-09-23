import React, { useContext } from 'react';
import ModuleContext from '../ModuleContext';
import { Button } from 'semantic-ui-react';

const ActionButton = ({ content = 'ActionModule', ...rest }) => {
  const { isEditing } = useContext(ModuleContext);

  return (
    <Button
      basic
      content={isEditing ? 'cancel' : content}
      floated='right'
      {...rest}
    />
  );
};

export default ActionButton;
