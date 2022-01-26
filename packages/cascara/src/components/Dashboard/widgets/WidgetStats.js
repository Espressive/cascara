import React from 'react';
import pt from 'prop-types';
import Widget, { propTypes as widgetPT } from './Widget';
import Columns from '../../../atoms/Columns';
import Stat from '../../../atoms/Stat';
import { getDataState } from './dataState';
import styles from '../Dashboard.module.scss';

const propTypes = {
  ...widgetPT,
  /** Data to display in a widget */
  data: pt.oneOfType([pt.array, pt.object]),
};

/**
 * Widget for displaying stats
 */
const WidgetStats = ({ data, ...rest }) => {
  const dataState = getDataState(data);

  return (
    <Widget {...rest} {...dataState} className={styles.Stats} height='auto'>
      <Columns count={2}>
        {data?.map((stat) => (
          <Stat fluid key={stat.label} {...stat} />
        ))}
      </Columns>
    </Widget>
  );
};

WidgetStats.propTypes = propTypes;
WidgetStats.displayName = 'stats';

export { propTypes };

export default WidgetStats;
