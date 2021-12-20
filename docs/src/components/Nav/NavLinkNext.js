import pt from 'prop-types';
import Link from 'next/link';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  isActive: pt.bool,
};

// This component is needed as a compatibility layer inside of AdminStructure.Nav due to the odd way that
// Link works inside of `next/link` where it does not render an element itself. This component allows us to
// maintain a structure that is consistent with other link components, and direct props into the expected location.
const NavLinkNext = ({ children, isActive, ...rest }) => {
  const classList = [rest.className, isActive ? 'active' : undefined];

  return (
    <Link {...rest}>
      <a className={classList.join(' ')}>{children}</a>
    </Link>
  );
};

NavLinkNext.propTypes = propTypes;

export default NavLinkNext;
