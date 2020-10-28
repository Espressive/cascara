import React, { useContext } from 'react';
import pt from 'prop-types';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import RowProvider from './context/RowProvider';
import { ModuleContext } from '../../modules/context';

import ActionBar from './ActionBar';

// Actions
import ActionButton from '../../modules/ActionButton';
import ActionEdit from '../../modules/ActionEdit';
import DownloadButton from '../../modules/DownloadButton';

// Data
// @manu: let's document this one
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
import DataCheckbox, {
  propTypes as dataCheckboxPT,
} from '../../modules/DataCheckbox';
import DataEmail, { propTypes as dataEmailPT } from '../../modules/DataEmail';
import DataNumber, {
  propTypes as dataNumberPT,
} from '../../modules/DataNumber';
import DataRadio, { propTypes as dataRadioPT } from '../../modules/DataRadio';
import DataSelect, {
  propTypes as dataSelectPT,
} from '../../modules/DataSelect';
import DataText, { propTypes as dataTextPT } from '../../modules/DataText';
import DataTextArea, {
  propTypes as dataTextAreaPT,
} from '../../modules/DataTextArea';
import ModuleError from '../../modules/ModuleError';

const ACTION_MODULES = {
  button: ActionButton,
  download: DownloadButton,
  edit: ActionEdit,
};
const DATA_MODULES = {
  checkbox: DataCheckbox,
  email: DataEmail,
  number: DataNumber,
  radio: DataRadio,
  select: DataSelect,
  switch: DataCheckbox,
  text: DataText,
  textarea: DataTextArea,
};
const actionModuleOptions = Object.keys(ACTION_MODULES);
const dataModuleOptions = Object.keys(DATA_MODULES);

const propTypes = {
  config: pt.shape({
    columns: pt.arrayOf(
      pt.oneOfType([
        dataCheckboxPT,
        dataEmailPT,
        dataNumberPT,
        dataRadioPT,
        dataSelectPT,
        dataTextPT,
        dataTextAreaPT,
      ])
    ),
    id: pt.string,
  }),
  record: pt.shape({}),
};

const TableRow = ({ config = {}, record = {} }) => {
  const { id, columns } = config;
  const {
    dataConfig: { actions: userDefinedActions = [] },
  } = useContext(ModuleContext);

  const actionBarCell = (
    <td className={styles.Cell} key={`${id}-actionbar`}>
      <ActionBar
        actions={userDefinedActions.map((action) => {
          const { module, ...rest } = action;
          const Action = ACTION_MODULES[module];

          /**
           * In certain predefined-action modules in which a label is not required, e.g. `edit`,
           * the following unique key generation fails, as it relies on the label (content). */
          const key = `${id}.${module}.${rest.content || module}`;

          return Action ? (
            <Action key={key} {...rest} />
          ) : (
            <ModuleError
              key={key}
              message={`Invalid module`}
              moduleName={module}
              moduleOptions={actionModuleOptions}
            />
          );
        })}
      />
    </td>
  );

  const rowCells = columns.map((column) => {
    const { module, ...rest } = column;
    const Module = DATA_MODULES[module];

    return (
      <td className={styles.Cell} key={column.attribute}>
        {Module ? (
          <Module {...rest} />
        ) : (
          <ModuleError
            message={`Invalid module`}
            moduleName={module}
            moduleOptions={dataModuleOptions}
          />
        )}
      </td>
    );
  });

  if (userDefinedActions.length) {
    rowCells.push(actionBarCell);
  }

  return (
    <ErrorBoundary>
      <RowProvider value={{ record }}>
        <tr className={styles.Row} key={id}>
          {rowCells}
        </tr>
      </RowProvider>
    </ErrorBoundary>
  );
};

TableRow.propTypes = propTypes;

export default TableRow;
