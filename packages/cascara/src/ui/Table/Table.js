import React from 'react';
import pt from 'prop-types';

import ErrorBoundary from '../../shared/ErrorBoundary';

import TableTable from './TableTable';
import TableLoading from './TableLoading';
import TableEmpty from './TableEmpty';

import { actionModules, dataModules } from '../../modules/ModuleKeys';

const actionModuleOptions = Object.keys(actionModules);
const dataModuleOptions = Object.keys(dataModules);

const propTypes = {
  /** Actions will be appended to each row, they'll appear as buttons. */
  actions: pt.shape({
    actionButtonMenuIndex: pt.number,

    modules: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(actionModuleOptions).isRequired,
      })
    ),

    // Resolve record actions.
    // A function that returns the actions available to the current row
    resolveRecordActions: pt.func,
  }),

  // An array of objects.
  //
  // Every object in this array will potencially be rendered as a table row.
  data: pt.arrayOf(pt.shape({})),

  // DEPRECATED: The main configuration for your table. Here you can specify the columns to display
  // as well as the available actions (if any) for each row.
  dataConfig: pt.shape({
    /** DEPRECATED - use actions instead */
    actionButtonMenuIndex: pt.number,

    /** DEPRECATED - use actions instead */
    actions: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(actionModuleOptions).isRequired,
      })
    ),

    /** DEPRECATED dataDisplay instead */
    display: pt.arrayOf(
      pt.shape({
        module: pt.oneOf(dataModuleOptions).isRequired,
      })
    ),
  }),

  /** Here you can describe each of the visible columns in your table. */
  dataDisplay: pt.arrayOf(
    pt.shape({
      module: pt.oneOf(dataModuleOptions).isRequired,
    })
  ),

  // Event handler.
  //
  // An event handler you can pass to handle every event your table emits.
  onAction: pt.func,

  // Resolve record actions.
  // A function that returns the actions available to the current row
  resolveRecordActions: pt.func,

  // Unique ID Attribute.
  //
  // specifies the attribute that uniquely identifies every object in the 'data' array.
  uniqueIdAttribute: pt.string,
};

/** This is a Table */
const Table = (props) => {
  const { data } = props;
  return (
    // 1. if data is undefined or null, render a loading state
    // 2. if data is an empty array, render an empty results message
    // 3. render the table data
    <ErrorBoundary>
      {data ? (
        data.length > 0 ? (
          <TableTable {...props} />
        ) : (
          <TableEmpty />
        )
      ) : (
        // This is a temporary loading style. We will eventually define a loading style using the shape of modules.
        <TableLoading />
      )}
    </ErrorBoundary>
  );
};

Table.propTypes = propTypes;

export { propTypes };
export default Table;
