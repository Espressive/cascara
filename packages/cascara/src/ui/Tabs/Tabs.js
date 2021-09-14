import React, { Suspense } from 'react';
import pt from 'prop-types';
import { TabList, useTabState } from 'reakit/Tab';
import Boundaries from '../../system-components/Boundaries';

import Tab from './Tab';
import TabPanel from './TabPanel';

const TAB_FALLBACK = <div className='ui bottom attached loading tab segment' />;

const propTypes = {
  tabs: pt.arrayOf(
    pt.shape({
      content: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
      label: pt.string.isRequired,
    })
  ),
  title: pt.string,
};

const Tabs = ({ tabs, title }) => {
  const tabState = useTabState();

  return (
    <>
      <TabList
        className='ui top attached small tabular menu'
        {...tabState}
        aria-label={title || 'Tabs'}
      >
        {title && (
          <h4
            className='header item'
            style={{
              padding: '0.9375rem 1.4375rem 0.9375rem 1rem',
            }}
          >
            {title}
          </h4>
        )}
        <Boundaries>
          {tabs?.map(({ label }) => (
            <Tab content={label} key={label} tabState={tabState} />
          ))}
        </Boundaries>
      </TabList>
      <Suspense fallback={TAB_FALLBACK}>
        {tabs?.map(({ content, label }) => (
          <TabPanel content={content} key={label} tabState={tabState} />
        ))}
      </Suspense>
    </>
  );
};

Tabs.propTypes = propTypes;

export default Tabs;
