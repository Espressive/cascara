import React from 'react';
import pt from 'prop-types';

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

const AdminStructureMainTabs = ({
  children,
  label,
  linkComponent,
  linkComponentProps,
}) => {
  const LinkComponent = linkComponent;

  return (
    <LinkComponent className='item' {...linkComponentProps}>
      {children ? children : label}
    </LinkComponent>
  );
};

AdminStructureMainTabs.propTypes = propTypes;

export default AdminStructureMainTabs;
