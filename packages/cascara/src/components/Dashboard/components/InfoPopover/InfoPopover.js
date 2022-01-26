import React from 'react';
import pt from 'prop-types';
import { Popover, PopoverDisclosure, usePopoverState } from 'reakit/Popover';

import styles from './InfoPopover.module.scss';

const propTypes = {
  message: pt.string,
  // eslint-disable-next-line react/forbid-prop-types -- We do not know what the object params might be in this case
  style: pt.object,
};

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
        className={`${styles.Disclosure} ui small basic circular icon button`}
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

InfoPopover.propTypes = propTypes;

export default InfoPopover;
