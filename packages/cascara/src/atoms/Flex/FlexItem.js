import React, { cloneElement } from 'react';
import pt from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Flex.module.scss';

const cx = classnames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),

  // Item can fill remaining space of the container.
  grow: pt.bool,

  // Item can be pushed towards opposite side in the container's direction.
  push: pt.bool,

  // Item can make itself smaller relative to others in the flex row.
  shrink: pt.bool,
};

const FlexItem = ({
  children,
  className,
  grow = false,
  push = false,
  shrink = false,
  ...rest
}) => {
  const classList = cx(className, {
    Item: true,
    grow,
    push,
  });

  // Might need to expand this for other than strings later
  const isValidElement = typeof children !== 'string';

  const element = isValidElement ? children : <div>{children}</div>;

  return cloneElement(element, {
    ...rest,
    className: classList,
  });
};

FlexItem.propTypes = propTypes;
FlexItem.displayName = 'Flex.Item';

export default FlexItem;
