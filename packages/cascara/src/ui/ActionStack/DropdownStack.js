import React, { useCallback, useEffect, useRef } from 'react';
import pt from 'prop-types';
import { ACTION_SHAPE } from './__globals';

const propTypes = {
  actions: pt.arrayOf(ACTION_SHAPE),
};

const DropdownStack = ({ actions }) => {
  useEffect(() => {
    selectRef.current.value = null;
  });

  const selectRef = useRef();

  const handleChange = useCallback(
    (e) => {
      actions[e.target.value].onClick();

      selectRef.current.value = null;
    },
    [actions]
  );

  return (
    <div className='ui form' style={{ display: 'inline-block' }}>
      <div className='field'>
        {/* eslint-disable-next-line jsx-a11y/no-onchange -- dev */}
        <select onChange={handleChange} ref={selectRef}>
          {actions?.map((action, i) => (
            <option {...action} key={action.label + i} value={i} />
          ))}
        </select>
      </div>
    </div>
  );
};

DropdownStack.propTypes = propTypes;

export default DropdownStack;
