import React from 'react';
import classnames from 'classnames/bind';
import pt from 'prop-types';
import styles from './Flex.module.scss';
import FlexItem from './FlexItem';

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
  children,
  className,
  column = false,
  fluid = true,
  space = 'between',
  vAlign = 'start',
}) => {
  const classList = cx(className, {
    _: true,
    column: column,
    fluid: fluid,
    ...getClassOptions(spaceOptions, space, 'space'),
    ...getClassOptions(vAlignOptions, vAlign, 'vAlign'),
  });

  return <div className={classList}>{children}</div>;
};

Flex.propTypes = propTypes;
Flex.Item = FlexItem;

export default Flex;
