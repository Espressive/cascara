import React from 'react';
import pt from 'prop-types';
import { Tab } from 'reakit';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  label: pt.string.isRequired,
  linkComponent: pt.shape({
    // Kind of a hack, but making sure that there is a render function
    // on the link component being passed so we know it is supposed to render
    render: pt.func,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types -- Could be anything
  linkComponentProps: pt.object,
};

const MainTabs = ({ children, label, linkComponent, linkComponentProps }) => {
  // const LinkComponent = linkComponent;

  return (
    <Tab as={linkComponent} className='item' {...linkComponentProps}>
      {children ? children : label}
    </Tab>
  );
};

MainTabs.propTypes = propTypes;

export default MainTabs;
