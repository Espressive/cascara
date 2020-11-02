import React, { useContext } from 'react';
import { ModuleContext, ModuleProvider } from '../../../modules/context';

const RowProvider = ({ children, value, ...props }) => {
  const grandparentValues = useContext(ModuleContext);

  // Here we need to not pass the isEditing and setIsEditing values from grandparent which
  // will override what is happening in the ModuleProvider we pass mergedValues into. This
  // way the row provider itself can have its own isEditing. This is also a good place for
  // us to control how these values get set if the overall table is getting edited on
  // another row.
  const { isEditing, setIsEditing, ...rest } = grandparentValues;
  const mergedValues = {
    ...ModuleContext.defaultValue,
    ...rest,
    ...value,
  };

  return (
    <ModuleProvider value={mergedValues} {...props}>
      {children}
    </ModuleProvider>
  );
};

export default RowProvider;
