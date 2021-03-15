import React from 'react';
import pt from 'prop-types';
import { Icon } from '@iconify/react';
import styles from './StructureNavLink.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  icon: pt.object,
  label: pt.string.isRequired,
  linkComponent: pt.shape({
    // Kind of a hack, but making sure that there is a render function
    // on the link component being passed so we know it is supposed to render
    render: pt.func,
  }).isRequired,
};

const StructureNavLink = ({
  children,
  icon,
  label,
  linkComponent,
  ...rest
}) => {
  const LinkComponent = linkComponent;

  return (
    <LinkComponent {...rest}>
      {children ? (
        children
      ) : (
        <>
          {icon && (
            <Icon className={styles.Icon} icon={icon} inline width={18} />
          )}
          {label}
        </>
      )}
    </LinkComponent>
  );
};

StructureNavLink.propTypes = propTypes;

export default StructureNavLink;
