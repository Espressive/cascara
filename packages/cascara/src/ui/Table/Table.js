import React from 'react';
import pt from 'prop-types';

import ErrorBoundary from '../../shared/ErrorBoundary';
import TableProvider from './context/TableProvider';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

const propTypes = {
  data: pt.arrayOf(pt.shape({})),
  dataConfig: pt.shape({
    actions: pt.arrayOf(pt.shape({
      content: pt.string,
      isLabeled: pt.bool,
      module: 'text',
      size: pt.oneOf(['small', 'medium', 'large']),
    })),
    bulkActions: pt.arrayOf(pt.shape({
      content: pt.string,
      isLabeled: pt.bool,
      module: pt.string,
      size: pt.oneOf(['small', 'medium', 'large']),
    })),
    display: pt.arrayOf(pt.shape({
      attribute: pt.string,
      isEditable: pt.bool,
      isLabeled: pt.bool,
      label: pt.string,
      module: pt.string,
    })),
  }),
};

const Table = ({ data, dataConfig, onAction, uniqueIDAttribute, ...rest }) => {
  const { actions, display } = dataConfig;
  let columnCount = display.length;

  if (actions.length) {
    columnCount++;
  }

  return (
    <ErrorBoundary>
      <TableProvider
        value={{ data, dataConfig, onAction, uniqueIDAttribute }}
        {...rest}
      >
        <table
          style={{
            gridTemplateColumns: `repeat(${columnCount}, auto)`,
          }}
        >
          <TableHeader />
          <TableBody />
          <TableFooter />
        </table>
      </TableProvider>
    </ErrorBoundary>
  );
};

Table.propTypes = propTypes;

export default Table;
