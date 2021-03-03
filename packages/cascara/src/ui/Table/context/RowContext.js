import React, { useCallback, useMemo, useState } from 'react';
import pt from 'prop-types';

const TableContext = React.createContext();

const propTypes = {
  children: pt.oneOfType([pt.element(), pt.arrayOf(pt.element)]),
  data: pt.arrayOf(pt.shape({})),
  dataConfig: pt.shape({
    actions: pt.arrayOf(pt.shape({})),
    bulkActions: pt.arrayOf(pt.shape({})),
    uniqueIdAttribute: pt.string,
  }),
  value: pt.shape({}),
};

const TableContextProvider = ({ children, data, dataConfig }) => {
  const { actions = [], bulkActions = [], uniqueIdAttribute } = dataConfig;
  const selectionIsEnabled = bulkActions.length > 0;

  const idsInData = data.map((record) => record[uniqueIdAttribute]);
  const [selection, updateSelection] = useState([]);

  const sanitizedSelection = selection.filter((selectedId) =>
    idsInData.includes(selectedId)
  );

  const selectAll = useCallback(() => {
    updateSelection([...idsInData]);
  }, [idsInData]);

  const clearSelection = useCallback(() => {
    updateSelection([]);
  }, [updateSelection]);

  const addToSelection = useCallback(
    (id) => {
      updateSelection([...selection, id]);
    },
    [selection, updateSelection]
  );

  const removeFromSelection = useCallback(
    (id) => {
      const newSelection = selection.filter((selectedId) => selectedId !== id);

      updateSelection([...newSelection]);
    },
    [selection, updateSelection]
  );

  const contextValue = useMemo(
    () => ({
      actions,
      addToSelection,
      bulkActions,
      clearSelection,
      data,
      dataConfig,
      idsInData,
      removeFromSelection,
      selectAll,
      selection: sanitizedSelection,
      selectionIsEnabled,
      uniqueIdAttribute,
    }),
    [
      actions,
      bulkActions,
      data,
      dataConfig,
      idsInData,
      sanitizedSelection,
      addToSelection,
      clearSelection,
      removeFromSelection,
      selectAll,
      selectionIsEnabled,
      uniqueIdAttribute,
    ]
  );

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};

TableContextProvider.propTypes = propTypes;

export { TableContextProvider };
export default TableContext;
