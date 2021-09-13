import React from 'react';
import pt from 'prop-types';
import { ACTION_SHAPE } from './__globals';
import ButtonStack from './ButtonStack';
import DropdownStack from './DropdownStack';
import { JsonPlaceholder } from '@espressive/cascara';

const propTypes = {
  actions: pt.arrayOf(ACTION_SHAPE),
  dropdownIndex: pt.number,
};

const ActionStack = ({ actions, dropdownIndex = 1 }) => {
  const buttonActions = actions.slice(0, dropdownIndex);
  const dropdownActions = actions.slice(dropdownIndex);

  return (
    <>
      <JsonPlaceholder data={buttonActions} title='buttonActions' />
      <JsonPlaceholder data={dropdownActions} title='dropdownActions' />
      {buttonActions && <ButtonStack actions={buttonActions} />}
      {dropdownActions && <DropdownStack actions={dropdownActions} />}
    </>
  );
};

ActionStack.propTypes = propTypes;

export default ActionStack;
