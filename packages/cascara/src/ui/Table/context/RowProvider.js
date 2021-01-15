import React, { useContext } from 'react';
import { ModuleContext, ModuleProvider } from '../../../modules/context';

const RowProvider = ({ children, value, ...props }) => {
  const grandparentValues = useContext(ModuleContext);

  const {
    idOfRecordInEditMode,
    uniqueIdAttribute,
    ...rest
  } = grandparentValues;
  const { record } = value;
  const recordId = record[uniqueIdAttribute];

  // isEditing is based on wether the record ids are the same
  const isEditing = recordId === idOfRecordInEditMode;

  const mergedValues = {
    ...ModuleContext.defaultValue,
    ...rest,
    ...value,
    idOfRecordInEditMode,
    isEditing,
    uniqueIdAttribute,
  };

  return (
    <ModuleProvider value={mergedValues} {...props}>
      {children}
    </ModuleProvider>
  );
};

export default RowProvider;
