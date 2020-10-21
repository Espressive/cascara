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
import DataNumber from '../../modules/DataNumber';
import DataRadio from '../../modules/DataRadio';
import DataSelect from '../../modules/DataSelect';
import DataText from '../../modules/DataText';
import DataTextArea from '../../modules/DataTextArea';
import ModuleError from '../../modules/ModuleError';
const dataModules = {
  avatar: DataText,
  checkbox: DataCheckbox,
  date: DataText,
  email: DataEmail,
  icon: DataText,
  link: DataText,
  number: DataNumber,
  radio: DataRadio,
  select: DataSelect,
  switch: DataCheckbox,
  text: DataText,
  textarea: DataTextArea,
};

const propTypes = {
  data: pt.oneOf([dataCheckboxPT, dataEmailPT]),
  module: pt.oneOf(['checkbox', 'select', 'email', 'number']),
};

const TableRow = ({ config = {}, record = {} }) => {
  const { id, columns } = config;
  const { dataConfig } = useContext(ModuleContext);

  const actionBarCell = (
    <td className={styles.Cell} key={`${id}-actionbar`}>
      <ActionBar
        actions={dataConfig.actions.map((action) => {
          const { module, ...rest } = action;
          let Module;

          switch (action.module) {
            case 'edit':
              Module = ActionEdit;
              break;

            case 'download':
              Module = DownloadButton;
              break;

            default:
              Module = ActionButton;
              break;
          }

          return (
            <Module key={`${action.module}.${action.content}`} {...rest} />
          );
        })}
      />
    </td>
  );

  const rowCells = columns.map((column) => {
    const { module, ...rest } = column;
    const Module = dataModules[module];

    if (!Module) {
      return (
        <td className={styles.Cell} key={column.attribute}>
          <ModuleError message={`${module} is not a valid Module`} />
        </td>
      );
    }

    return (
      <td className={styles.Cell} key={column.attribute}>
        <Module {...rest} />
      </td>
    );
  });

  if (dataConfig.actions.length) {
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
