import React, { useCallback, useContext } from 'react';
import pt from 'prop-types';

import CheckBox from './Checkbox';
import { ModuleContext } from '../../../modules/context';

const propTypes = {
  id: pt.string,
};

const SelectionToggle = ({ id }) => {
  const { clearSelection, select, selectAll, selection, recordIDs, unselect } =
    useContext(ModuleContext);

  const selectedItemsCount = selection.length;
  const availableItemsCount = recordIDs.length;
  const allItemsSelected = selectedItemsCount === availableItemsCount;
  const someItemsSelected = selection.length >= 1;

  const checked = id !== '__ALL__' ? selection.includes(id) : someItemsSelected;
  const indeterminate = id ? false : !allItemsSelected;

  const handleSelectionToggle = useCallback(
    ({ checked, name }) => {
      if (name === '__ALL__') {
        if (checked) {
          selectAll();
        } else {
          clearSelection();
        }
      } else {
        if (selection.includes(name)) {
          unselect(name);
        } else {
          select(name);
        }
      }
    },
    [selectAll, clearSelection, selection, unselect, select]
  );

  return (
    <CheckBox
      checked={checked}
      indeterminate={indeterminate}
      name={id}
      onChange={handleSelectionToggle}
    />
  );
};

SelectionToggle.propTypes = propTypes;

export default SelectionToggle;
