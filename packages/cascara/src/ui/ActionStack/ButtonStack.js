import React from 'react';
import pt from 'prop-types';
import Button from '../../atoms/Button';
import { ACTION_SHAPE } from './__globals';

const propTypes = {
  actions: pt.arrayOf(ACTION_SHAPE),
};

const ButtonStack = ({ actions }) => {
  return actions?.map(({ label, onClick, handler }, i) => (
    <Button content={label} key={label + i} onClick={handler || onClick} />
  ));
};

ButtonStack.propTypes = propTypes;

export default ButtonStack;
