import React, { useCallback, useContext } from 'react';
import pt from 'prop-types';

import CheckBox from './Checkbox';
import { ModuleContext } from '../../../modules/context';

const propTypes = {
  id: pt.string,
};

const SelectionToggle = ({ id }) => {
  const { rowSelect, selection, rowUnselect } = useContext(ModuleContext);
  const checked = selection?.includes(id);

  const handleSelectionToggle = useCallback(
    ({ name }) => {
      if (selection.includes(name)) {
        rowUnselect(name);
      } else {
        rowSelect(name);
      }
    },
    [selection, rowUnselect, rowSelect]
  );

  return (
    <CheckBox checked={checked} name={id} onChange={handleSelectionToggle} />
  );
};

SelectionToggle.propTypes = propTypes;

export default SelectionToggle;
