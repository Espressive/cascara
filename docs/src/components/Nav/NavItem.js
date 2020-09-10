import Link from 'next/link';
import styles from './Nav.module.scss';

const NavItem = ({ content, isActive, status, ...rest }) => {
  return (
    <Link {...rest}>
      <a className={styles.NavItem} data-active={isActive ? true : undefined}>
        {content} {status && <span>{status}</span>}
      </a>
    </Link>
  );
};

export default NavItem;
