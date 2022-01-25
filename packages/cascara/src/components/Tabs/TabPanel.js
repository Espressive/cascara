import React, { useRef } from 'react';
import pt from 'prop-types';
import { TabPanel as RKTabPanel } from 'reakit/Tab';

const propTypes = {
  content: pt.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types -- This is a Reakit state object
  tabState: pt.object.isRequired,
};

const TabPanel = ({ content, tabState }) => {
  const thisPanel = useRef(null);

  // We use this to conditionally render the contents of the Tab so that we are
  // not firing off a bunch of API calls for pages with tab-heavy API content.
  const isActive =
    thisPanel?.current?.getAttribute('aria-labelledby') === tabState.currentId;

  return (
    <RKTabPanel
      className='ui bottom attached active tab segment'
      ref={thisPanel}
      {...tabState}
    >
      {isActive ? content : null}
    </RKTabPanel>
  );
};

TabPanel.propTypes = propTypes;

export default TabPanel;
