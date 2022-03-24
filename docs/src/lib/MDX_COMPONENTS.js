// All components that we intend to use in our MDX files _must_ be defined here
// or else they will not be rendered in our MDX files. This includes
// all components in Cascara. Our implementation of MDX in these docs does
// not allow imports in the MDX file itself. This is an unfortunate limitation
// until there is a better way to import static data dynamically in Nextjs

import {
  ActionStack,
  AdminStructure,
  AreaPlaceholder,
  Boundaries,
  Button,
  Chat,
  Columns,
  Dashboard,
  DatePicker,
  Flex,
  Form,
  JsonPlaceholder,
  List,
  Pagination,
  Section,
  Stat,
  Table,
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
  ErrorFallback,
  ModuleProvider,
  ModuleSandbox,
  SuspenseFallback,
} from '@espressive/cascara/private';

import { Asciagram, Code, Placeholder, Rule } from '../components';

const docsComponents = {
  Asciagram: (props) => <Asciagram {...props} />,
  Playground: (props) => <Placeholder {...props} componentName='Playground' />,
  Props: (props) => <Placeholder {...props} componentName='Props' />,
  Rule: (props) => <Rule {...props} />,
  code: (props) => <Code {...props} />,
};

const cascaraComponents = {
  ActionStack: (props) => <ActionStack {...props} />,
  AdminStructure: (props) => <AdminStructure {...props} />,
  AreaPlaceholder: (props) => <AreaPlaceholder {...props} />,
  Boundaries: (props) => <Boundaries {...props} />,
  Button: (props) => <Button {...props} />,
  Chat: (props) => (
    <ChatProvider>
      <Chat {...props} />
    </ChatProvider>
  ),
  Columns: (props) => <Columns {...props} />,
  Dashboard: (props) => <Dashboard {...props} />,
  DatePicker: (props) => <DatePicker {...props} />,
  Flex: (props) => <Flex {...props} />,
  Form: (props) => <Form {...props} />,
  JsonPlaceholder: (props) => <JsonPlaceholder {...props} />,
  List: (props) => <List {...props} />,
  Pagination: (props) => <Pagination {...props} />,
  Section: (props) => <Section {...props} />,
  Stat: (props) => <Stat {...props} />,
  Table: (props) => <Table {...props} />,
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
  ErrorFallback: (props) => <ErrorFallback {...props} />,
  Flex: (props) => <Flex {...props} />,
  ModuleProvider: (props) => <ModuleProvider {...props} />,
  ModuleSandbox: (props) => <ModuleSandbox {...props} />,
  SuspenseFallback: (props) => <SuspenseFallback {...props} />,
  TestFallbackComponent: (props) => <div>Test Fallback</div>,
};

const MDX_COMPONENTS = {
  ...cascaraComponents,
  ...docsComponents,
  ...privateComponents,
  usePaginationState,
};

export default MDX_COMPONENTS;
