import React, { useContext } from 'react';

import RowProvider from './context/RowProvider';
import { ModuleContext } from '../../modules/context';

import ActionBar from './ActionBar';

// Actions
import ActionButton from '../../modules/ActionButton';
import ActionEdit from '../../modules/ActionEdit';
import DownloadButton from '../../modules/DownloadButton';

// Data
// import DataTextArea from '../../modules/DataCheckbox';
// import DataEmail from '../../modules/DataEmail';
// import DataNumber from '../../modules/DataNumber';
// import DataRadio from '../../modules/DataRadio';
// import DataSelect from '../../modules/DataSelect';
import DataText from '../../modules/DataText';

const TableRow = (record = {}) => {
  const { id, columns } = record;
  const { dataConfig } = useContext(ModuleContext);

  const actionBarCell = (
    <td key={`${id}-actionbar`}>
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

          return <Module {...rest} key={`module.${action.label}`} />;
        })}
      />
    </td>
  );

  const rowCells = columns.map((column) => {
    let Module;

    switch (column.type) {
      case 'string':
        Module = DataText;
        break;

      default:
        Module = DataText;
        break;
    }

    return (
      <td key={column.attribute}>
        <Module {...column} />
      </td>
    );
  });

  if (dataConfig.actions.length) {
    rowCells.push(actionBarCell);
  }

  return (
    <RowProvider value={{ record }}>
      <tr key={id}>{rowCells}</tr>
    </RowProvider>
  );
};

export default TableRow;
