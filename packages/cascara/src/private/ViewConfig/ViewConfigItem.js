import React, { useCallback, useMemo } from 'react';
import pt from 'prop-types';
import classnames from 'classnames/bind';
import { MenuItem } from 'reakit/Menu';
import Button from '../Button';
import { arrowDownIcon, arrowUpIcon } from '@espressive/icons';

import styles from './ViewConfig.module.scss';

const cx = classnames.bind(styles);

const propTypes = {
  isActive: pt.bool,
  itemAdd: pt.func.isRequired,
  itemRemove: pt.func.isRequired,
  label: pt.string.isRequired,
  moveItemDown: pt.func.isRequired,
  moveItemUp: pt.func.isRequired,
  state: pt.shape({
    hide: pt.func,
    modal: pt.bool,
    placement: pt.string,
    preventBodyScroll: pt.boolean,
    unstable_popperModifiers: pt.arrayOf(
      pt.shape({
        name: pt.string,
        options: pt.shape({
          offset: pt.func,
        }),
      })
    ),
  }).isRequired,
};

const ViewConfigItem = ({
  isActive,
  itemAdd,
  itemRemove,
  label,
  moveItemDown,
  moveItemUp,
  state,
  ...rest
}) => {
  const originalObject = useMemo(
    () => ({
      label,
      ...rest,
    }),
    [label, rest]
  );

  const handleItemAdd = useCallback(() => {
    itemAdd(originalObject);
  }, [itemAdd, originalObject]);

  const handleItemRemove = useCallback(() => {
    itemRemove(originalObject);
  }, [itemRemove, originalObject]);

  const handlemoveItemUp = useCallback(
    (e) => {
      e.stopPropagation();
      moveItemUp(originalObject);
    },
    [moveItemUp, originalObject]
  );

  const handlemoveItemDown = useCallback(
    (e) => {
      e.stopPropagation();
      moveItemDown(originalObject);
    },
    [moveItemDown, originalObject]
  );

  return (
    <MenuItem
      {...state}
      {...rest}
      as='div'
      className={cx('item', ['ViewConfigItem'], { active: isActive })}
      onClick={isActive ? handleItemRemove : handleItemAdd}
    >
      <span className={styles.Label}>{label}</span>
      {isActive && (
        <div className={styles.MoveButtons}>
          <Button
            aria-label='Move up'
            icon={arrowUpIcon}
            onClick={handlemoveItemUp}
            size='small'
          />
          <Button
            aria-label='Move down'
            icon={arrowDownIcon}
            onClick={handlemoveItemDown}
            size='small'
          />
        </div>
      )}
    </MenuItem>
  );
};

ViewConfigItem.propTypes = propTypes;

export default ViewConfigItem;
