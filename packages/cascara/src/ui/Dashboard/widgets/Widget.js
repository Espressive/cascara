import React, { Children, cloneElement } from 'react';
import classnames from 'classnames/bind';
import pt from 'prop-types';
import Boundaries from '../../../system-components/Boundaries';
import InfoPopover from '../components/InfoPopover';
import { Button } from 'reakit';
import styles from '../Dashboard.module.scss';

const cx = classnames.bind(styles);

const propTypes = {
  /** A widget can display action buttons */
  actions: pt.arrayOf(
    pt.shape({
      content: pt.string,
    })
  ),
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  /** aWidget can have a css class name */
  className: pt.string,
  /** A widget can have a clickable info icon with a description */
  description: pt.string,
  /** The height of a widget */
  height: pt.oneOfType([pt.number, pt.oneOf(['auto'])]),
  // A widget can be in an empty state
  isEmpty: pt.bool,
  // A widget can be in a loading state
  isLoading: pt.bool,
  /** A widget can contain scrolling content */
  isScrolling: pt.bool,
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
  isEmpty = false,
  isLoading = false,
  isScrolling = false,
  title,
  ...rest
}) => {
  return (
    <div
      className={cx(className, {
        Widget: true,
        scrolling: isScrolling,
      })}
    >
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

      {/* Place our error boundary here so that we can at least show the 
      title of the widget above the error itself. */}
      <Boundaries>
        <div
          className={cx(className, {
            Data: true,
            'no-data': isEmpty || isLoading,
          })}
          style={{ height: height }}
        >
          {isLoading ? (
            <div className='ui active centered inline loader' />
          ) : isEmpty ? (
            <em>No data.</em>
          ) : (
            Children.map(children, (child) => cloneElement(child, { ...rest }))
          )}
        </div>
      </Boundaries>
    </div>
  );
};

Widget.propTypes = propTypes;
Widget.displayName = 'shared props';

export { propTypes };

export default Widget;
