import pt from 'prop-types';
import Link from 'next/link';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  isActive: pt.bool,
};

const NavLinkNext = ({ children, isActive, ...rest }) => {
  const classList = [rest.className, isActive ? 'active' : undefined];

  return (
    <div className={classList.join(' ')}>
      <Link {...rest}>
        <a>{children}</a>
      </Link>
    </div>
  );
};

NavLinkNext.propTypes = propTypes;

export default NavLinkNext;
