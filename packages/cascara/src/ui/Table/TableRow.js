import React, { useContext } from 'react';
import pt from 'prop-types';
import styles from './Table.module.scss';

import ErrorBoundary from '../../shared/ErrorBoundary';
import RowProvider from './context/RowProvider';
import { ModuleContext } from '../../modules/context';

import ActionsMenu from '../ActionsMenu';

// todo @manu: let's document this one
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md

import ModuleError from '../../modules/ModuleError';

import { actionModules, dataModules } from '../../modules/ModuleKeys';
import { tableActionModules } from './modules';

// A table can have common and table-specific modules
const bundledActionModules = {
  ...actionModules,
  ...tableActionModules,
};
const actionModuleOptions = Object.keys(bundledActionModules);
const dataModuleOptions = Object.keys(dataModules);

const propTypes = {
  config: pt.shape({
    columns: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(dataModuleOptions).isRequired,
      }).isRequired
    ),
    id: pt.oneOfType([pt.string, pt.number]),
  }),
  record: pt.shape({}),
};

const TableRow = ({ config = {}, record = {} }) => {
  const { id, columns } = config;
  const {
    dataConfig: { actionButtonMenuIndex = 0, actions: userDefinedActions = [] },
  } = useContext(ModuleContext);
  const outsideButtonActions = [];
  const insideButtonActions = [];
  userDefinedActions
    .filter(({ module }) => module === 'button')
    .map((action, index) =>
      index >= actionButtonMenuIndex
        ? insideButtonActions.push(action)
        : outsideButtonActions.push(action)
    );
  const specialActions = userDefinedActions.filter(
    ({ module }) => module !== 'button'
  );
  const outsideActions = [...specialActions, ...outsideButtonActions];

  const renderActionModule = (action, index) => {
    const { module, ...rest } = action;
    const key = `${id}.${module}.${rest.content || module}.${index}`;
    const Action = actionModules[module];

    return Action ? (
      <Action key={key} {...rest} />
    ) : (
      <ModuleError
        key={key}
        moduleName={module}
        moduleOptions={actionModuleOptions}
      />
    );
  };

  const actions = (
    <td className={styles.CellActions} key={`${id}-actionbar`}>
      {outsideActions.map(renderActionModule)}
      {Boolean(insideButtonActions.length) ? (
        <ActionsMenu actions={insideButtonActions} />
      ) : null}
    </td>
  );

  const rowCells = columns.map((column) => {
    const { module, isLabeled, ...rest } = column;
    const Module = dataModules[module];
    const moduleValue = record[column.attribute];
    const moduleKey = `${module}.${column.attribute}:${moduleValue}`;

    return (
      <td className={styles.Cell} key={column.attribute}>
        {Module ? (
          <Module
            {...rest}
            isLabeled={false}
            key={moduleKey}
            value={moduleValue}
          />
        ) : (
          <ModuleError
            key={column.attribute}
            moduleName={module}
            moduleOptions={dataModuleOptions}
          />
        )}
      </td>
    );
  });

  if (userDefinedActions.length) {
    rowCells.push(actions);
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
