import React from 'react';
import classnames from 'classnames/bind';
import pt from 'prop-types';
import styles from './Flex.module.scss';
import FlexItem from './FlexItem';
import { Role } from 'reakit/Role';

const cx = classnames.bind(styles);

const spaceOptions = ['around', 'between', 'end', 'evenly', 'start'];
const vAlignOptions = ['end', 'stretch', 'center', 'start'];

const getClassOptions = (options, prop, prefix) =>
  Object.assign(
    ...options.map((option) => {
      const className = `${prefix}-${option}`;
      const value = prop === option;

      return {
        [className]: value,
      };
    })
  );

const propTypes = {
  as: pt.string,
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  className: pt.string,

  // Sets vertical flow direction.
  column: pt.bool,

  // Orders container to fill all parent's space available.
  fluid: pt.bool,

  // Defines strategy for distributing remaining space between items.
  space: pt.oneOf(spaceOptions),

  // Controls items alignment in vertical direction.
  vAlign: pt.oneOf(vAlignOptions),
};

const Flex = ({
  as = 'div',
  children,
  className,
  column = false,
  fluid = true,
  space = 'between',
  vAlign = 'start',
  ...rest
}) => {
  const classList = cx(className, {
    _: true,
    column: column,
    fluid: fluid,
    ...getClassOptions(spaceOptions, space, 'space'),
    ...getClassOptions(vAlignOptions, vAlign, 'vAlign'),
  });

  return (
    <Role {...rest} as={as} className={classList}>
      {children}
    </Role>
  );
};

Flex.propTypes = propTypes;
Flex.Item = FlexItem;

export default Flex;
