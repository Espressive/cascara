import React from 'react';
import pt from 'prop-types';
import { ACTION_SHAPE } from './__globals';
import ButtonStack from './ButtonStack';
import DropdownStack from './DropdownStack';

const propTypes = {
  /** An array of objects describing the actions */
  actions: pt.arrayOf(ACTION_SHAPE),
  /** A number specifying the index at which `actions` start to appear as dropdown items */
  dropdownIndex: pt.number,
};

const ActionStack = ({ actions, dropdownIndex = 1 }) => {
  const buttonActions = actions?.slice(0, dropdownIndex);
  const dropdownActions = actions?.slice(dropdownIndex);

  return (
    <>
      {buttonActions && <ButtonStack actions={buttonActions} />}
      {dropdownActions && <DropdownStack actions={dropdownActions} />}
    </>
  );
};

ActionStack.propTypes = propTypes;

export default ActionStack;
