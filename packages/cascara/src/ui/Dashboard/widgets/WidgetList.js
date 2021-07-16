import React from 'react';
import pt from 'prop-types';
import Widget, { propTypes as widgetPT } from './Widget';
import WidgetListAction from './WidgetListAction';
import { getDataState } from './dataState';

const propTypes = {
  ...widgetPT,
  /** Data to display in a widget */
  data: pt.oneOfType([pt.array, pt.object]),
  /** Values to show from `data`. If not defined, all will show. */
  keys: pt.arrayOf(pt.string),
  /** An action function which can be used to do something with any of the data from the object */
  rowAction: pt.func,
};

/**
 * Widget for displaying list data.
 */
const WidgetList = ({ data, keys, rowAction, ...rest }) => {
  const { isLoading, isEmpty } = getDataState(data);

  const preparedData = keys
    ? data?.map((obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([key]) => keys.includes(key))
        )
      )
    : data;

  return (
    <Widget {...rest} isScrolling>
      {isLoading ? (
        <div className='ui active centered inline loader' />
      ) : isEmpty ? (
        <em>No data.</em>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(preparedData[0]).map((headCol, i) => (
                <th key={i}>{headCol}</th>
              ))}
              {rowAction && <th />}
            </tr>
          </thead>
          <tbody>
            {preparedData?.map((item, i) => (
              <tr key={i}>
                {Object.values(item).map((col, i) => (
                  <td key={i}>{col}</td>
                ))}
                {rowAction && (
                  <td style={{ textAlign: 'right', width: '1px' }}>
                    {/* We make sure to pass the full, original object to the action button */}
                    <WidgetListAction item={data[i]} onClick={rowAction} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Widget>
  );
};

WidgetList.propTypes = propTypes;
WidgetList.displayName = 'list';

export { propTypes };

export default WidgetList;
