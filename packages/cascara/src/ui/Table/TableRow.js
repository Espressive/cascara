import React, { useContext } from 'react';

import RowProvider from './context/RowProvider';
import { ModuleContext } from '../../modules/context';

import ActionBar from './ActionBar';

// Actions
import ActionButton from '../../modules/ActionButton';
import ActionEdit from '../../modules/ActionEdit';
import DownloadButton from '../../modules/DownloadButton';

// Data
import DataCheckbox from '../../modules/DataCheckbox';
import DataEmail from '../../modules/DataEmail';
import DataNumber from '../../modules/DataNumber';
import DataRadio from '../../modules/DataRadio';
import DataSelect from '../../modules/DataSelect';
import DataText from '../../modules/DataText';
import DataTextArea from '../../modules/DataTextArea';

const TableRow = ({ config = {}, record = {} }) => {
  const { id, columns } = config;
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

          return <Module key={`module.${action.content}`} {...rest} />;
        })}
      />
    </td>
  );

  const rowCells = columns.map((column) => {
    const { module: type, ...rest } = column;
    let Module;

    debugger;
    switch (type) {
      case 'checkbox':
        Module = DataCheckbox;
        break;

      case 'email':
        Module = DataEmail;
        break;

      case 'number':
        Module = DataNumber;
        break;

      case 'radio':
        Module = DataRadio;
        break;

      case 'select':
        Module = DataSelect;
        break;

      case 'textarea':
        Module = DataTextArea;
        break;

      default:
        Module = DataText;
        break;
    }

    return (
      <td key={column.attribute}>
        <Module {...column} {...rest} />
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
