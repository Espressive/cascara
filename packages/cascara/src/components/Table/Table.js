import React from 'react';
import pt from 'prop-types';

import Boundaries from '../../atoms/Boundaries';
import TableBase from './TableBase';
import TableLoading from '../../private/TemporaryLoading';
import TableEmpty from '../../private/TemporaryEmpty';

import { actionModules, dataModules } from '../../modules/ModuleKeys';
import { SORT_ORDER } from './state/sortingReducer';

const actionModuleOptions = Object.keys(actionModules);
const dataModuleOptions = Object.keys(dataModules);

/** This is a Table */
const Table = (props) => {
  const { data } = props;
  return (
    // NOTE: This is likely a common pattern for us in Cascara and we may want
    // to evaluate how we present empty and loading component/state boilerplate.
    // 1. if data is undefined or null, render a loading state
    // 2. if data is an empty array, render an empty results message
    // 3. render the table data
    <Boundaries>
      {data ? (
        data.length > 0 ? (
          // This is all of the logic that previously existed in this component.
          // Not sure if this is the correct strategy for this yet, but it was
          // a good way to make sure any logic for Table display did not blow up
          // if we have empty data or undefined in helper functions.
          <TableBase {...props} />
        ) : (
          // This is a temporary empty style.
          <TableEmpty />
        )
      ) : (
        // This is a temporary loading style. We will eventually define a loading style using the shape of modules.
        <TableLoading />
      )}
    </Boundaries>
  );
};

Table.propTypes = {
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

  /** Initial sort configuration */
  initialSort: pt.shape({
    attribute: pt.string,
    order: pt.oneOf(Object.keys(SORT_ORDER)),
  }),

  // Event handler.
  //
  // An event handler you can pass to handle every event your table emits.
  onAction: pt.func,

  // Resolve record actions.
  // A function that returns the actions available to the current row
  resolveRecordActions: pt.func,

  // Selection
  selections: pt.oneOfType([
    pt.bool,
    pt.exact({
      max: pt.number,
    }),
  ]),

  // Sorting
  sortable: pt.oneOf([pt.boolean, pt.string, pt.arrayOf(pt.string)]),

  // Unique ID Attribute.
  //
  // specifies the attribute that uniquely identifies every object in the 'data' array.
  uniqueIdAttribute: pt.string,
};

export default Table;
