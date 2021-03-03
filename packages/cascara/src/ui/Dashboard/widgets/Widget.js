import React, { Children, cloneElement } from 'react';
import pt from 'prop-types';
import InfoPopover from '../../InfoPopover';
import { Button } from 'reakit';
import styles from '../Dashboard.module.scss';

const propTypes = {
  /** A widget can display action buttons */
  actions: pt.arrayOf(
    pt.shape({
      content: pt.string,
    })
  ),
  children: pt.oneOfType([pt.element(), pt.arrayOf(pt.element)]),
  /** aWidget can have a css class name */
  className: pt.string,
  /** A widget can have a clickable info icon with a description */
  description: pt.string,
  /** The height of a widget */
  height: pt.oneOfType([pt.number, pt.oneOf(['auto'])]),
  /** A widget can display with a title */
  title: pt.string,
};

/**
 * Shared props and logic for all Widgets
 */
const Widget = ({
  actions,
  children,
  className,
  description,
  height = 400,
  title,
  ...rest
}) => {
  return (
    <div className={className || styles.Widget}>
      {actions?.map((action, i) => (
        <Button
          key={i}
          {...action}
          className='ui small basic right floated button'
        >
          {action?.content}
        </Button>
      ))}
      {description && (
        <InfoPopover message={description} style={{ float: 'right' }} />
      )}
      <h3 className={styles.Title}>{title}</h3>
      <div className={styles.Data} style={{ height: height }}>
        {Children.map(children, (child) => cloneElement(child, { ...rest }))}
      </div>
    </div>
  );
};

Widget.propTypes = propTypes;
Widget.displayName = 'shared props';

export { propTypes };

export default Widget;
