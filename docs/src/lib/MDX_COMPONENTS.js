/* eslint-disable react/no-multi-comp */

// All components that we intend to use in our MDX files _must_ be defined here
// or else they will not be rendered in our MDX files. This includes
// all components in Cascara. Our implementation of MDX in these docs does
// not allow imports in the MDX file itself. This is an unfortunate limitation
// until there is a better way to import static data dynamically in Nextjs

import {
  Admin,
  Button,
  Dashboard,
  JsonPlaceholder,
  Pagination,
  Table,
} from '@espressive/cascara';

import {
  ActionButton,
  ActionEdit,
  DataCheckbox,
  DataEmail,
  DataNumber,
  DataRadio,
  DataSelect,
  DataText,
  DataTextArea,
  ModuleProvider,
} from '@espressive/cascara/private';

import { Asciagram, Code, Placeholder } from '../components';

/* eslint-disable sort-keys */
const MDX_COMPONENTS = {
  // Docs
  Asciagram: (props) => <Asciagram {...props} />,
  Playground: (props) => <Placeholder {...props} componentName='Playground' />,
  Props: (props) => <Placeholder {...props} componentName='Props' />,
  code: (props) => <Code {...props} />,

  // Cascara
  Admin: (props) => <Admin {...props} />,
  Button: (props) => <Button {...props} />,
  Dashboard: (props) => <Dashboard {...props} />,
  JsonPlaceholder: (props) => <JsonPlaceholder {...props} />,
  Pagination: (props) => <Pagination {...props} />,
  Table: (props) => <Table {...props} />,

  // Private
  ActionButton: (props) => <ActionButton {...props} />,
  ActionEdit: (props) => <ActionEdit {...props} />,
  DataCheckbox: (props) => <DataCheckbox {...props} />,
  DataEmail: (props) => <DataEmail {...props} />,
  DataNumber: (props) => <DataNumber {...props} />,
  DataRadio: (props) => <DataRadio {...props} />,
  DataSelect: (props) => <DataSelect {...props} />,
  DataText: (props) => <DataText {...props} />,
  DataTextArea: (props) => <DataTextArea {...props} />,
  ModuleProvider: (props) => <ModuleProvider {...props} />,
};
/* eslint-enable sort-keys */

export default MDX_COMPONENTS;
