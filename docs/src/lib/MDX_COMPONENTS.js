// All components that we intend to use in our MDX files _must_ be defined here
// or else they will not be rendered in our MDX files. This includes
// all components in Cascara. Our implementation of MDX in these docs does
// not allow imports in the MDX file itself. This is an unfortunate limitation
// until there is a better way to import static data dynamically in Nextjs

import {
  ActionStack,
  AdminStructure,
  Button,
  ChatMessages,
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
  DataColor,
  DataDate,
  DataDateTime,
  DataEmail,
  DataFile,
  DataImage,
  DataMonth,
  DataNumber,
  DataPassword,
  DataRadio,
  DataRange,
  DataSelect,
  DataTel,
  DataText,
  DataTextArea,
  DataTime,
  DataUrl,
  DataWeek,
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
  AdminStructure: (props) => <AdminStructure {...props} />,
  Button: (props) => <Button {...props} />,
  ChatMessages: (props) => (
    <ChatProvider>
      <ChatMessages {...props} />
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
  DataColor: (props) => <DataColor {...props} />,
  DataDate: (props) => <DataDate {...props} />,
  DataDateTime: (props) => <DataDateTime {...props} />,
  DataEmail: (props) => <DataEmail {...props} />,
  DataFile: (props) => <DataFile {...props} />,
  DataImage: (props) => <DataImage {...props} />,
  DataMonth: (props) => <DataMonth {...props} />,
  DataNumber: (props) => <DataNumber {...props} />,
  DataPassword: (props) => <DataPassword {...props} />,
  DataRadio: (props) => <DataRadio {...props} />,
  DataRange: (props) => <DataRange {...props} />,
  DataSelect: (props) => <DataSelect {...props} />,
  DataTel: (props) => <DataTel {...props} />,
  DataText: (props) => <DataText {...props} />,
  DataTextArea: (props) => <DataTextArea {...props} />,
  DataTime: (props) => <DataTime {...props} />,
  DataUrl: (props) => <DataUrl {...props} />,
  DataWeek: (props) => <DataWeek {...props} />,
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
