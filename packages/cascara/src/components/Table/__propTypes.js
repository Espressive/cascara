import pt from 'prop-types';
import { actionModules, dataModules } from '../../modules/ModuleKeys';
import { SORT_ORDER } from './state/sortingReducer';

const actionModuleOptions = Object.keys(actionModules);
const dataModuleOptions = Object.keys(dataModules);

export const TABLE_SHAPE = {
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

  /**
   * An array of objects.
   * Every object in this array will potencially be rendered as a table row.
   */
  data: pt.arrayOf(pt.shape({})),

  /**
   * DEPRECATED: The main configuration for your table. Here you can specify the columns to display
   * as well as the available actions (if any) for each row.
   */
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

  /**
   * Event handler.
   *
   * An event handler you can pass to handle every event your table emits.
   */
  onAction: pt.func,

  /**
   * Resolve record actions.
   * A function that returns the actions available to the current row
   */
  resolveRecordActions: pt.func,

  /**
   * Selection
   */
  selections: pt.oneOfType([
    pt.bool,
    pt.exact({
      max: pt.number,
    }),
  ]),

  /**
   * The Sort state and the means to mutate it.
   *
   * sortAttribute: the Attribute name to sort by, sortOrder: either ASCENDING or DESCENDING, sortRecordsBy a function to mutate the state
   */
  sortState: pt.shape({
    sortAttribute: pt.string,
    sortOrder: pt.oneOf(Object.keys(SORT_ORDER)),
    sortRecordsBy: pt.func,
  }),

  /**
   * Specifies which sorting strategy to follow:
   *
   *
   * {Boolean} Specifies that all attributes are sortable
   * {String} Attribute, the attribute (column) to sort by
   * {Array[String]} Sortable, an array of attributes (columns) to sort by
   */
  sortable: pt.oneOfType([pt.bool, pt.string, pt.arrayOf(pt.string)]),

  /**
   * Unique ID Attribute.
   *
   * specifies the attribute that uniquely identifies every object in the 'data' array.
   */
  uniqueIdAttribute: pt.string,
};
