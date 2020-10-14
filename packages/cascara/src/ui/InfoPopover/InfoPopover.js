import React from 'react';
import styles from './InfoPopover.module.scss';

import {
  Popover,
  // PopoverArrow,
  PopoverDisclosure,
  usePopoverState,
} from 'reakit/Popover';

const InfoPopover = ({ message, style }) => {
  const popover = usePopoverState({
    animated: 150,
    gutter: 8,
    placement: 'bottom-end',
  });
  return (
    <>
      <PopoverDisclosure
        {...popover}
        className={styles.Disclosure + ' ui small basic circular icon button'}
        style={style}
      >
        <i aria-hidden='true' className='info icon' />
      </PopoverDisclosure>
      <Popover
        {...popover}
        aria-label='Info'
        className={styles.Popover}
        tabIndex={0}
      >
        {message || 'NO MESSAGE PROVIDED!'}
      </Popover>
    </>
  );
};

export default InfoPopover;
