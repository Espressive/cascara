import React from 'react';
import DataImage from './DataImage';
import ModuleSandbox from '../ModuleSandbox';

const DataImageSandbox = ({ isEditing, ...rest }) => (
  <ModuleSandbox isEditing={isEditing}>
    <DataImage {...rest} />
  </ModuleSandbox>
);

const srcPath = '/media/examples/my-button.png';

const displayProps = {
  label: 'Display',
  src: srcPath,
};

const editingProps = {
  isEditing: true,
  label: 'Editing',
  src: srcPath,
  alt: 'Start',
};

// These can be used in tests
export { displayProps, editingProps };

// These are our fixtures
export default {
  display: <DataImageSandbox {...displayProps} />,
  displayNoLabel: <DataImageSandbox {...displayProps} isLabeled={false} />,
  editing: <DataImageSandbox {...editingProps} />,
  editingNoLabel: <DataImageSandbox {...editingProps} isLabeled={false} />,
};
