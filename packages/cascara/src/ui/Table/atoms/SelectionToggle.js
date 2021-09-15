import React, { useCallback, useContext } from 'react';
import pt from 'prop-types';

import CheckBox from './Checkbox';
import { ModuleContext } from '../../../modules/context';

const propTypes = {
  id: pt.string,
};

const SelectionToggle = ({ id }) => {
  const { select, selection, unselect } = useContext(ModuleContext);
  const checked = selection.includes(id);

  const handleSelectionToggle = useCallback(
    ({ name }) => {
      if (selection.includes(name)) {
        unselect(name);
      } else {
        select(name);
      }
    },
    [selection, unselect, select]
  );

  return (
    <CheckBox checked={checked} name={id} onChange={handleSelectionToggle} />
  );
};

SelectionToggle.propTypes = propTypes;

export default SelectionToggle;
