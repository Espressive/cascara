import React, { useMemo } from 'react';
import pt from 'prop-types';
import { Boundaries } from '../../system-components';
import ModuleError from '../../modules/ModuleError';
import RowProvider from './context/RowProvider';
import ActionStack from '../ActionStack';
import styles from './Table.module.scss';
// import { ModuleContext } from '../../modules/context';
import { dataModules } from '../../modules/ModuleKeys';
const dataModuleOptions = Object.keys(dataModules);

const propTypes = {
  actions: pt.arrayOf(pt.object),
  dataDisplay: pt.arrayOf(pt.object),
  // The data object which will be passed to modules for the row
  // eslint-disable-next-line react/forbid-prop-types -- Data can be any object
  rowData: pt.object.isRequired,
};

const TableRow = ({ rowData, dataDisplay, actions }) => {
  // Create our array of modules to display for the row. We explicitly only pass
  // certain props here so we do not have unexpected things happening when passing
  // a ...rest spread of props
  const moduleCells = useMemo(
    () =>
      dataDisplay.map(({ attribute, module, isEditable }, i) => {
        // use the 'module' property to define which of our modules to render in JSX
        const ModuleComponent = dataModules[module];
        // Use the `attribute` property to pick the value to display from our row data
        const moduleValue = rowData[attribute];

        return (
          <td className={styles.Cell} key={attribute || i}>
            {ModuleComponent ? (
              // Make sure we have a ModuleComponent actually defined to render
              <ModuleComponent
                isEditable={isEditable}
                // Because this is a Table, we explicitly do not allow configuration
                // of modules to be `isLabeled` on modules as the table header acts as
                // our label. We also do not destructure the value from `dataDisplay`.
                // There is a check on the data for this in the TableHeader component
                // to alert developers of bad data configurations. The code is located
                // there so that we do not do the check on dataConfig on every row rendered.
                isLabeled={false}
                value={moduleValue}
              />
            ) : (
              // If ModuleComponent is `undefined` above due to an invalid module
              // configuration on the `dataDisplay` object, we show an error that
              // helps resolve the issue by presenting a list of possible modules.
              <ModuleError
                moduleName={module}
                moduleOptions={dataModuleOptions}
              />
            )}
          </td>
        );
      }),
    [dataDisplay, rowData]
  );

  const actionCell = actions && (
    <td className={styles.CellActions} key='CellActionRow'>
      <ActionStack actions={actions} />
    </td>
  );

  // This is our array of all cells that a row should render
  const rowCells = [...moduleCells, actionCell];

  return (
    <Boundaries>
      <RowProvider value={{ rowData }}>
        <tr className={styles.Row}>{rowCells}</tr>
      </RowProvider>
    </Boundaries>
  );
};

TableRow.propTypes = propTypes;

export default TableRow;
