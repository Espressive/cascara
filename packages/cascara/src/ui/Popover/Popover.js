import React, { useRef } from 'react';
import {
  PopoverDisclosure,
  Popover as ReakitPopover,
  usePopoverState,
} from 'reakit/Popover';
import styles from './Popover.module.scss';

const Popover = ({ content, trigger }) => {
  // Set a ref on our trigger to pass into the disclosure and also measure clientHeight
  const triggerRef = useRef();

  const popover = usePopoverState({
    gutter: 0,
    placement: 'bottom-end',
  });

  return (
    <>
      <PopoverDisclosure {...popover} ref={triggerRef} {...trigger.props}>
        {(disclosureProps) => React.cloneElement(trigger, disclosureProps)}
      </PopoverDisclosure>
      <ReakitPopover className={styles._} {...popover}>
        {content}
      </ReakitPopover>
    </>
  );
};

export default Popover;
