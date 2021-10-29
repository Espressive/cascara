import React, { useRef } from 'react';
import pt from 'prop-types';
import {
  PopoverBackdrop,
  PopoverDisclosure,
  Popover as ReakitPopover,
  usePopoverState,
} from 'reakit/Popover';
import classNames from 'classnames/bind';
import styles from './Popover.module.scss';
import { popperOverTrigger } from '../../lib/popperModifiers';

const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  className: pt.string,
  trigger: pt.node,
};

const Popover = ({ children, className, trigger, ...rest }) => {
  // Set a ref on our trigger to pass into the disclosure and also measure clientHeight
  const triggerRef = useRef();

  const popover = usePopoverState({
    gutter: 0,
    modal: true,
    placement: 'bottom-end',
    unstable_popperModifiers: [popperOverTrigger],
  });

  return (
    <>
      <PopoverDisclosure {...popover} ref={triggerRef} {...trigger.props}>
        {(disclosureProps) => React.cloneElement(trigger, disclosureProps)}
      </PopoverDisclosure>
      <ReakitPopover
        aria-label={rest['aria-label'] ? rest['aria-label'] : 'Menu'}
        className={cx('_', className)}
        {...popover}
        {...rest}
      >
        {children}
      </ReakitPopover>
      <PopoverBackdrop className={styles.Backdrop} {...popover} />
    </>
  );
};

Popover.propTypes = propTypes;

export default Popover;
