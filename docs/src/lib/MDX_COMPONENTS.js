// All components that we intend to use in our MDX files _must_ be defined here
// or else they will not be rendered in our MDX files. This includes
// all components in Cascara. Our implementation of MDX in these docs does
// not allow imports in the MDX file itself. This is an unfortunate limitation
// until there is a better way to import static data dynamically in Nextjs

import {
  Admin,
  Button,
  Chat,
  Dashboard,
  Form,
  JsonPlaceholder,
  Table,
} from '@espressive/cascara';

import {
  ActionButton,
  ActionEdit,
  ActionEditTable,
  ChatProvider,
  DataCheckbox,
  DataEmail,
  DataNumber,
  DataRadio,
  DataSelect,
  DataText,
  DataTextArea,
  ModuleProvider,
  ModuleSandbox,
} from '@espressive/cascara/private';

import { Asciagram, Code, Placeholder } from '../components';

/* eslint-disable react/display-name, react/no-multi-comp  -- We need to do this in order to get all of our components into MDX */
const docsComponents = {
  Asciagram: (props) => <Asciagram {...props} />,
  Playground: (props) => <Placeholder {...props} componentName='Playground' />,
  Props: (props) => <Placeholder {...props} componentName='Props' />,
  code: (props) => <Code {...props} />,
};

const cascaraComponents = {
  Admin: (props) => <Admin {...props} />,
  Button: (props) => <Button {...props} />,
  Chat: (props) => (
    <ChatProvider>
      <Chat {...props} />
    </ChatProvider>
  ),
  Dashboard: (props) => <Dashboard {...props} />,
  Form: (props) => <Form {...props} />,
  JsonPlaceholder: (props) => <JsonPlaceholder {...props} />,
  Table: (props) => <Table {...props} />,
};

const privateComponents = {
  ActionButton: (props) => <ActionButton {...props} />,
  ActionEdit: (props) => <ActionEdit {...props} />,
  ActionEditTable: (props) => <ActionEditTable {...props} />,
  DataCheckbox: (props) => <DataCheckbox {...props} />,
  DataEmail: (props) => <DataEmail {...props} />,
  DataNumber: (props) => <DataNumber {...props} />,
  DataRadio: (props) => <DataRadio {...props} />,
  DataSelect: (props) => <DataSelect {...props} />,
  DataText: (props) => <DataText {...props} />,
  DataTextArea: (props) => <DataTextArea {...props} />,
  ModuleProvider: (props) => <ModuleProvider {...props} />,
  ModuleSandbox: (props) => <ModuleSandbox {...props} />,
};
/* eslint-enable react/display-name, react/no-multi-comp */

const MDX_COMPONENTS = {
  ...cascaraComponents,
  ...docsComponents,
  ...privateComponents,
};

export default MDX_COMPONENTS;
