// All components that we intend to use in our MDX files _must_ be defined here
// or else they will not be rendered in our MDX files. This includes
// all components in Cascara. Our implementation of MDX in these docs does
// not allow imports in the MDX file itself. This is an unfortunate limitation
// until there is a better way to import static data dynamically in Nextjs

import {
  ActionStack,
  Admin,
  Button,
  ChatOld,
  Columns,
  Dashboard,
  FormOld,
  JsonPlaceholder,
  List,
  Pagination,
  Section,
  TableOld,
  Tabs,
  Title,
  usePaginationState,
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

const docsComponents = {
  Asciagram: (props) => <Asciagram {...props} />,
  Playground: (props) => <Placeholder {...props} componentName='Playground' />,
  Props: (props) => <Placeholder {...props} componentName='Props' />,
  code: (props) => <Code {...props} />,
};

const cascaraComponents = {
  ActionStack: (props) => <ActionStack {...props} />,
  Admin: (props) => <Admin {...props} />,
  Button: (props) => <Button {...props} />,
  ChatOld: (props) => (
    <ChatProvider>
      <ChatOld {...props} />
    </ChatProvider>
  ),
  Columns: (props) => <Columns {...props} />,
  Dashboard: (props) => <Dashboard {...props} />,
  FormOld: (props) => <FormOld {...props} />,
  JsonPlaceholder: (props) => <JsonPlaceholder {...props} />,
  List: (props) => <List {...props} />,
  Pagination: (props) => <Pagination {...props} />,
  Section: (props) => <Section {...props} />,
  TableOld: (props) => <TableOld {...props} />,
  Tabs: (props) => <Tabs {...props} />,
  Title: (props) => <Title {...props} />,
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

const MDX_COMPONENTS = {
  ...cascaraComponents,
  ...docsComponents,
  ...privateComponents,
  usePaginationState,
};

export default MDX_COMPONENTS;
