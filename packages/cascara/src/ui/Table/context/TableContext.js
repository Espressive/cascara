import React, { useCallback, useMemo, useState } from 'react';
import pt from 'prop-types';

const TableContext = React.createContext();

const propTypes = {
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]),
  data: pt.shape({}),
  dataConfig: pt.shape({
    actions: pt.arrayOf(pt.shape({})),
    bulkActions: pt.arrayOf(pt.shape({})),
    display: pt.arrayOf(pt.shape({})),
    uniqueIdAttribute: pt.string,
  }),
  onAction: pt.func,
};

const TableContextProvider = ({
  data = [],
  dataConfig,
  children,
  onAction = (e) => e,
}) => {
  const { actions = [], bulkActions = [], uniqueIdAttribute } = dataConfig;
  const selectionIsEnabled = bulkActions.length > 0;

  const idsInData = data.map((record) => record[uniqueIdAttribute]);
  const [selection, updateSelection] = useState([]);

  const sanitizedSelection = selection.filter((selectedId) =>
    idsInData.includes(selectedId)
  );

  const selectedColumns = dataConfig.display.map((column) => column.attribute);

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

  const handleOnAction = useCallback(
    (name, id) => {
      let da = id;

      if (!da) {
        da = data.reduce((all, record) => {
          if (selection.includes(record[uniqueIdAttribute])) {
            all.push(record);
          }

          return all;
        }, []);

        da = da.reduce((all, rawRecord) => {
          const record = selectedColumns.reduce((record, column) => {
            record[column] = rawRecord[column];

            return record;
          }, {});

          all.push(record);

          return all;
        }, []);
      } else {
        da = data.filter((record) => record[uniqueIdAttribute] === id).pop();
        da = selectedColumns.reduce((record, column) => {
          record[column] = da[column];

          return record;
        }, {});
      }

      onAction(name, da, {
        columns: selectedColumns,
        selection,
      });
    },
    [data, onAction, selection, selectedColumns, uniqueIdAttribute]
  );

  const contextValue = useMemo(
    () => ({
      actions,
      addToSelection,
      bulkActions,
      clearSelection,
      data,
      dataConfig,
      handleOnAction,
      idsInData,
      removeFromSelection,
      selectAll,
      selectedColumns,
      selection: sanitizedSelection,
      selectionIsEnabled,
      uniqueIdAttribute,
    }),
    [
      actions,
      bulkActions,
      data,
      dataConfig,
      handleOnAction,
      idsInData,
      sanitizedSelection,
      addToSelection,
      clearSelection,
      removeFromSelection,
      selectAll,
      selectedColumns,
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
