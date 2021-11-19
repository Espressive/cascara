import React from 'react';
import pt from 'prop-types';
import styles from './Tooltip.module.scss';
import {
  Tooltip as ReakitTooltip,
  TooltipReference,
  useTooltipState,
} from 'reakit/Tooltip';

const propTypes = {
  // Component that should have a tooltip
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  // Content of the tooltip itself
  content: pt.string,
  // Delay in ms before showing the tooltip
  delay: pt.number,
};

// We are taking the default Reakit hook for state and adding some checks for delay
const useDelayedTooltipState = ({ delay, ...initialState }) => {
  const tooltip = useTooltipState(initialState);

  // Do not use react state for this or else this hook will always be one behind the render
  let shouldShow = false;

  return {
    ...tooltip,
    hide: () => {
      // We do not want to show the tooltip if the mouse exits before the delay time
      shouldShow = false;
      tooltip.hide();
    },
    show: () => {
      shouldShow = true;

      setTimeout(() => {
        // We check if we should still show the tooltip in case the mouse has exited before our delay
        if (shouldShow) {
          tooltip.show();
        }
      }, delay);
    },
  };
};

const Tooltip = ({ children, content, delay = 500, ...props }) => {
  // TODO: We need a way to define this hook so that it gets cleaned up even
  // if there is a long delay defined so the callback after timeout does not
  // try to call a nonexistent function
  const tooltip = useDelayedTooltipState({
    animated: 100,
    delay,
    gutter: 6,
  });
  return (
    <>
      <TooltipReference {...tooltip} ref={children.ref} {...children.props}>
        {(referenceProps) => React.cloneElement(children, referenceProps)}
      </TooltipReference>
      <ReakitTooltip {...tooltip} {...props} className={styles.Parent}>
        <div className={styles.Container}>{content}</div>
      </ReakitTooltip>
    </>
  );
};

Tooltip.propTypes = propTypes;

export { propTypes };
export default Tooltip;
