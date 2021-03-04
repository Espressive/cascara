import Link from 'next/link';
import pt from 'prop-types';

import Tag from '../Tag';
import styles from './Nav.module.scss';

const propTypes = {
  content: pt.string,
  isActive: pt.bool,
  status: pt.string,
};

const NavItem = ({ content, isActive, status, ...rest }) => {
  // We do not want the data prop on the component at all if it is not true
  const active = isActive ? true : undefined;
  return (
    <Link {...rest}>
      <a className={styles.NavItem} data-active={active}>
        {content}
        {status && (
          <Tag
            content={status}
            style={{
              float: 'right',
              verticalAlign: 'top',
            }}
          />
        )}
      </a>
    </Link>
  );
};

NavItem.propTypes = propTypes;

export default NavItem;
