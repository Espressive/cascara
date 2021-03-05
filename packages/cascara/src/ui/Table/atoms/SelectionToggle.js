import React, { useCallback, useContext } from 'react';
import pt from 'prop-types';

import CheckBox from '../../Checkbox';
import TableContext from '../context/TableContext';

const propTypes = {
  id: pt.string,
};

const SelectionToggle = ({ id }) => {
  const {
    addToSelection,
    clearSelection,
    idsInData,
    removeFromSelection,
    selectAll,
    selection,
  } = useContext(TableContext);

  const selectedItemsCount = selection.length;
  const availableItemsCount = idsInData.length;
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
          removeFromSelection(name);
        } else {
          addToSelection(name);
        }
      }
    },
    [selectAll, clearSelection, removeFromSelection, addToSelection, selection]
  );

  return (
    <CheckBox
      checked={checked ? 1 : 0}
      indeterminate={indeterminate}
      name={id}
      onChange={handleSelectionToggle}
    />
  );
};

SelectionToggle.propTypes = propTypes;

export default SelectionToggle;
