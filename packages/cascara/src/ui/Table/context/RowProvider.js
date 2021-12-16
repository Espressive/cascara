import React, { useContext } from 'react';
import pt from 'prop-types';

import { ModuleContext, ModuleProvider } from '../../../modules/context';

const propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  value: pt.shape({
    rowData: pt.shape({}),
  }),
};

const RowProvider = ({ children, value, ...props }) => {
  const grandparentValues = useContext(ModuleContext);

  const { idOfRecordInEditMode, uniqueIdAttribute, ...rest } =
    grandparentValues;
  const { rowData } = value;
  const recordId = rowData[uniqueIdAttribute];

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

RowProvider.propTypes = propTypes;

export default RowProvider;
