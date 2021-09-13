import React, { useRef } from 'react';
import pt from 'prop-types';
import { Tab as RKTab } from 'reakit/Tab';
import classnames from 'classnames';

const propTypes = {
  content: pt.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types -- This is a Reakit state object
  tabState: pt.object.isRequired,
};

const Tab = ({ content, tabState }) => {
  const thisTab = useRef(null);

  return (
    <RKTab
      className={classnames('item', {
        active: thisTab?.current?.id === tabState.currentId,
      })}
      ref={thisTab}
      style={{
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
      }}
      {...tabState}
    >
      {content}
    </RKTab>
  );
};

Tab.propTypes = propTypes;

export default Tab;
