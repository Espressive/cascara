import React from 'react';
import pt from 'prop-types';
import { ACTION_SHAPE } from './__globals';
import ButtonStack from './ButtonStack';
import DropdownStack from './DropdownStack';
import { Role } from 'reakit/Role';
import { filter, has } from 'ramda';
import { useDeveloperMessage } from '../../hooks';

const propTypes = {
  /** An array of objects describing the actions */
  actions: pt.arrayOf(ACTION_SHAPE),
  as: pt.string,
  /** A number specifying the index at which `actions` start to appear as dropdown items */
  dropdownIndex: pt.number,
};

const ActionStack = ({ as = 'div', actions, dropdownIndex = 1, ...rest }) => {
  const buttonActions = actions?.slice(0, dropdownIndex);
  const dropdownActions = actions?.slice(dropdownIndex);

  const isUsingDeprecatedOnClick = filter(has('onClick'), actions).length;

  useDeveloperMessage(
    isUsingDeprecatedOnClick,
    'onClick has been deprecated for action objects and will be removed in a future release. Please use "handler" for any action objects.'
  );

  return (
    <Role {...rest} as={as}>
      {buttonActions && <ButtonStack actions={buttonActions} />}
      {dropdownActions && <DropdownStack actions={dropdownActions} />}
    </Role>
  );
};

ActionStack.propTypes = propTypes;

export default ActionStack;
