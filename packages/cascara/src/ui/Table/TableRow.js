import React, { useContext } from 'react';
import pt from 'prop-types';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import RowProvider from './context/RowProvider';
import { ModuleContext } from '../../modules/context';

import ActionBar from './ActionBar';

// Data
// @manu: let's document this one
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md

import ModuleError from '../../modules/ModuleError';

import { actionModules, dataModules } from '../../modules/ModuleKeys';

const actionModuleOptions = Object.keys(actionModules);
const dataModuleOptions = Object.keys(dataModules);

const propTypes = {
  config: pt.shape({
    columns: pt.arrayOf(
      pt.oneOfType([
        pt.shape({
          module: pt.oneOf(dataModuleOptions).isRequired,
        }).isRequired,
      ])
    ),
    id: pt.oneOfType([pt.string, pt.number]),
  }),
  record: pt.shape({}),
};

const TableRow = ({ config = {}, record = {} }) => {
  const { id, columns } = config;
  const {
    dataConfig: { actions: userDefinedActions = [] },
  } = useContext(ModuleContext);

  const actionBarCell = (
    <td className={styles.CellActions} key={`${id}-actionbar`}>
      <ActionBar
        actions={userDefinedActions.map((action) => {
          const { module, ...rest } = action;
          const Action = actionModules[module];

          /**
           * In certain predefined-action modules in which a label is not required, e.g. `edit`,
           * the following unique key generation fails, as it relies on the label (content). */
          const key = `${id}.${module}.${rest.label || module}`;

          return Action ? (
            <Action key={key} {...rest} />
          ) : (
            <ModuleError
              key={key}
              moduleName={module}
              moduleOptions={actionModuleOptions}
            />
          );
        })}
      />
    </td>
  );

  const rowCells = columns.map((column) => {
    const { module, isLabeled, ...rest } = column;
    const Module = dataModules[module];

    return (
      <td className={styles.Cell} key={column.attribute}>
        {Module ? (
          <Module isLabeled={false} {...rest} />
        ) : (
          <ModuleError moduleName={module} moduleOptions={dataModuleOptions} />
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
