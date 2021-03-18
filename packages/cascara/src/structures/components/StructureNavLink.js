import React from 'react';
import pt from 'prop-types';
import { Icon } from '@iconify/react';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  icon: pt.object,
  label: pt.string.isRequired,
  linkComponent: pt.shape({
    // Kind of a hack, but making sure that there is a render function
    // on the link component being passed so we know it is supposed to render
    render: pt.func,
  }),
  // eslint-disable-next-line react/forbid-prop-types -- Could be anything
  linkComponentProps: pt.object,
};

const StructureNavLink = ({
  children,
  icon,
  label,
  linkComponent = 'a',
  linkComponentProps,
  ...rest
}) => {
  const LinkComponent = linkComponent;

  return (
    <LinkComponent {...rest} {...linkComponentProps}>
      {children ? (
        children
      ) : (
        <>
          {icon && <Icon className='icon' icon={icon} inline width={18} />}
          <span className='label'>{label}</span>
        </>
      )}
    </LinkComponent>
  );
};

StructureNavLink.propTypes = propTypes;

export default StructureNavLink;
