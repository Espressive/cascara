import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Button } from 'reakit';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- We have no way of knowing the item/object keys
  item: pt.object.isRequired,
  onClick: pt.func.isRequired,
};

const WidgetListAction = ({ item, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <Button className='ui mini basic icon button' onClick={handleClick}>
      <i aria-hidden='true' className='arrow right icon' />
    </Button>
  );
};

WidgetListAction.propTypes = propTypes;

export default WidgetListAction;
