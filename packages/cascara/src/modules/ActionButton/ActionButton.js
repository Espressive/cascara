import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext } from '../context';
import { Button } from 'reakit';

const propTypes = {
  /** Every action can have a name */
  actionName: pt.string,
  /** Test ids to ease testing */
  'data-testid': pt.string,
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
  const { data, isEditing, onAction, record } = useContext(ModuleContext);
  const dataOrRecord = record || data;

  const handleClick = (e) => {
    e.preventDefault();
    const {
      currentTarget: { name },
    } = e;

    onAction(
      {
        name,
      },
      dataOrRecord
    );
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
