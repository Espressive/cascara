import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';
import Flex from '../../../../atoms/Flex';
import { Button } from 'reakit';
import { Icon } from '@iconify/react';
import styles from './Nav.module.scss';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
  icon: pt.object,
  label: pt.string.isRequired,
  linkComponent: pt.oneOfType([
    pt.shape({
      // Kind of a hack, but making sure that there is a render function
      // on the link component being passed so we know it is supposed to render
      render: pt.func,
    }),

    // This is for some of the other possible link types on older routers
    pt.func,

    // or if someone wants to define a DOM element 'a', 'div', etc
    pt.string,
  ]),
  // eslint-disable-next-line react/forbid-prop-types -- Could be anything
  linkComponentProps: pt.object,
  post: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const NavLink = ({
  icon,
  label = 'NavLink',
  linkComponent = 'a',
  linkComponentProps,
  post,
  ...rest
}) => (
  <Button
    {...rest}
    {...linkComponentProps}
    as={linkComponent}
    className={styles.NavLink}
  >
    <Flex space='start' vAlign='center'>
      {icon && (
        <Role>
          <Icon className='icon' icon={icon} inline width={18} />
        </Role>
      )}
      <span className='label'>{label}</span>
      {post && <Flex.Item push>{post}</Flex.Item>}
    </Flex>
  </Button>
);

NavLink.propTypes = propTypes;

export default NavLink;
