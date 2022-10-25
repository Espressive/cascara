import React, { useCallback } from 'react';
import pt from 'prop-types';
import Widget, { propTypes as widgetPT } from './Widget';
import WidgetListAction from './WidgetListAction';
import { getDataState } from './dataState';
import styles from './WidgetList.module.scss';

const propTypes = {
  ...widgetPT,
  /** Data to display in a widget */
  data: pt.oneOfType([pt.array, pt.object]),
  footer: pt.shape({
    data: pt.shape({
      [pt.string]: pt.shape({
        value: pt.oneOfType([pt.string, pt.number]),
      }),
    }),
    settings: pt.shape({
      hidden: pt.bool,
    }),
  }),
  header: pt.shape({
    settings: pt.shape({
      sticky: pt.bool,
    }),
  }),
  /** Values to show from `data`. If not defined, all will show. */
  keys: pt.arrayOf(pt.string),
  /** An action function which can be used to do something with any of the data from the object */
  rowAction: pt.func,
};

const getPreparedData = (keys, data) =>
  keys
    ? data?.map((obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([key]) => keys.includes(key))
        )
      )
    : data;

const buildFooter = ({ keys, footerData }) => {
  if (footerData !== undefined) {
    return keys.map((key, i) => {
      if (footerData[key]?.value) {
        return <th key={i}>{footerData[key].value}</th>;
      }
      return <th key={i} />;
    });
  } else {
    return null;
  }
};
const renderFooter = ({ footer, keys }) => {
  const { data, settings } = footer;
  const { footerHidden, tableFooterSticky } = styles;
  const classNames = settings?.hidden ? footerHidden : tableFooterSticky;
  return footer && data ? (
    <tfoot className={`${classNames} animated-sticky-footer`}>
      {buildFooter({ footerData: data, keys })}
    </tfoot>
  ) : null;
};

/**
 * Widget for displaying list data.
 */
const WidgetList = ({ data, footer, header, keys, rowAction, ...rest }) => {
  const dataState = getDataState(data);
  const { isEmpty, isLoading } = dataState;
  const { tableHeaderSticky } = styles;

  const preparedData = getPreparedData(keys, data);

  const handleScroll = useCallback(({ target }) => {
    const { scrollHeight, offsetHeight, scrollTop } = target;
    const widgetFooter = target.getElementsByClassName(
      'animated-sticky-footer'
    );
    const isScrollHittingTheBottom =
      scrollHeight - offsetHeight - scrollTop < 10;
    if (isScrollHittingTheBottom) {
      widgetFooter[0]?.classList.add(styles['tableFooterSticky-solid']);
    } else {
      widgetFooter[0]?.classList.remove(styles['tableFooterSticky-solid']);
    }
  }, []);

  return (
    <Widget
      className={'animatedListFooterAtScrollDown'}
      {...rest}
      {...dataState}
      isScrolling
      onScroll={handleScroll}
    >
      {!isLoading && !isEmpty && (
        <table>
          <thead className={header?.settings?.sticky ? tableHeaderSticky : ''}>
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
          {footer && renderFooter({ footer, keys })}
        </table>
      )}
    </Widget>
  );
};

WidgetList.propTypes = propTypes;
WidgetList.displayName = 'list';

export { propTypes };

export default WidgetList;
