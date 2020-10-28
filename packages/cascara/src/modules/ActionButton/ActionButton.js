import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'semantic-ui-react';

const propTypes = pt.shape({
  content: pt.string,
  isLabeled: pt.bool,
  label: pt.string,
});

const ActionButton = ({
  content = 'ActionButton',
  isLabeled = false,
  label,
  ...rest
}) => {
  const { isEditing, onAction, record } = useContext(ModuleContext);

  // we need to mute the SUIR prop
  const buttonLabel = isLabeled ? content || label : null;

  const handleClick = (e) => {
    // eslint-disable-next-line no-console
    console.log('ActionButton: handleClick()');
    onAction({ label: buttonLabel }, record);
  };

  return isEditing ? null : (
    <Button
      basic
      content={content}
      onClick={handleClick}
      {...rest}
      label={buttonLabel}
      type='button'
    />
  );
};

ActionButton.propTypes = propTypes;

export { propTypes };
export default ActionButton;
