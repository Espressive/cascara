import React, { useCallback, useMemo, useState } from 'react';

const TableContext = React.createContext();

export const TableContextProvider = ({ data, dataConfig, children }) => {
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

export default TableContext;
