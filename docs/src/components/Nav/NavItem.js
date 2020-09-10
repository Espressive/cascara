import Link from 'next/link';
import styles from './Nav.module.scss';

const NavItem = ({ content, isActive, status, ...rest }) => {
  // We do not want the data prop on the component at all if it is not true
  const active = isActive ? true : undefined;
  return (
    <Link {...rest}>
      <a className={styles.NavItem} data-active={active}>
        {content} {status && <span>{status}</span>}
      </a>
    </Link>
  );
};

export default NavItem;
