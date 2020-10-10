import React, { useContext } from 'react';

import { ModuleContext } from '../../modules/context';

import ActionBar from './ActionBar';
import ActionButton from '../../modules/ActionButton';
import ActionEdit from '../../modules/ActionEdit';
import DownloadButton from '../../modules/DownloadButton';

const TableFooter = () => {
  const { dataConfig } = useContext(ModuleContext);

  const actionBarCell = (
    <ActionBar
      actions={dataConfig.actions.map((action) => {
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

        return <Module {...action} content={action.label} key={action.label} />;
      })}
    />
  );

  const headerCells = dataConfig.display.map((column) => (
    <th key={column.attribute}>{column.label}</th>
  ));

  if (dataConfig.actions.length) {
    headerCells.push(<th key={'action-bar-slot'} />);
  }

  return (
    <tfoot>
      <tr key={'foot-header'}>{headerCells}</tr>
      <tr key={'foot-actions'}>
        <td colSpan={headerCells.length}>{actionBarCell}</td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
