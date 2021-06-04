/* eslint-disable eslint-comments/disable-enable-pair -- we need this because of the line below */
/* eslint-disable no-undef -- We need to leverage React hooks */
// All components that we intend to use in our MDX files _must_ be defined here
// or else they will not be rendered in our MDX files. This includes
// all components in Cascara. Our implementation of MDX in these docs does
// not allow imports in the MDX file itself. This is an unfortunate limitation
// until there is a better way to import static data dynamically in Nextjs

import pt from 'prop-types';

import {
  Admin,
  Button,
  Chat,
  Dashboard,
  JsonPlaceholder,
  Table,
} from '@espressive/cascara';

import {
  ActionButton,
  ActionEdit,
  ChatProvider,
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

const ModuleExample = ({ children, isEditing, record = {} }) => {
  const [state, setState] = React.useState({
    idOfRecordInEditMode: 0,
    isEditing,
    record,
    uniqueIdAttribute: 'eid',
  });

  const enterEditMode = React.useCallback(() => {
    setState({
      ...state,
      isEditing: true,
    });
  }, [state, setState]);

  const exitEditMode = React.useCallback(() => {
    setState({
      ...state,
      isEditing: false,
    });
  }, [state, setState]);

  const handleSubmit = React.useCallback(
    (data) => {
      // eslint-disable-next-line no-console -- we need this as a developer message
      console.log('Edition completed: ', data);

      setState({
        ...state,
        isEditing: false,
        record: data,
      });
    },
    [state, setState]
  );

  const reset = React.useCallback(() => {
    // eslint-disable-next-line no-console -- we need this as a developer message
    console.log('Edition canceled');

    setState({
      ...state,
      isEditing: false,
    });
  }, [state, setState]);

  const onAction = React.useCallback((action, record) => {
    // eslint-disable-next-line no-console -- we need this as a developer message
    console.log('Action invoked: ', action?.name, record);
  }, []);

  return (
    <ModuleProvider
      value={{
        ...state,
        enterEditMode,
        exitEditMode,
        formMethods: {
          formState: {
            isDirty: false,
            isSubmitting: false,
          },
          handleSubmit,
          reset,
        },
        onAction,
      }}
    >
      {children}
    </ModuleProvider>
  );
};

ModuleExample.propTypes = {
  children: pt.oneOf([pt.arrayOf(pt.node), pt.node]),
  isEditing: pt.bool,
  record: pt.shape({}),
};

/* eslint-disable react/display-name, react/no-multi-comp  -- We need to do this in order to get all of our components into MDX */
const docsComponents = {
  Asciagram: (props) => <Asciagram {...props} />,
  ModuleExample,
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
  JsonPlaceholder: (props) => <JsonPlaceholder {...props} />,
  Table: (props) => <Table {...props} />,
};

const privateComponents = {
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
/* eslint-enable react/display-name, react/no-multi-comp */

const MDX_COMPONENTS = {
  ...cascaraComponents,
  ...docsComponents,
  ...privateComponents,
};

export default MDX_COMPONENTS;
