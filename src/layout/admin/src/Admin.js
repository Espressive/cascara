import pt from 'prop-types';
import AdminHeader from './AdminHeader';
import AdminMain from './AdminMain';
import AdminNav from './AdminNav';
import useSetLayoutAttribute from '../../../shared/useSetLayoutAttribute';

const propTypes = {
  children: pt.node,
};

const Admin = ({ children }) => {
  // This hook sets a `data-layout` attribute on the html tag, which is needed for CSS specificity in global styles
  useSetLayoutAttribute('admin');

  // We only want to return the children in the root node and set styles on the #root
  return children;
};

Admin.propTypes = propTypes;

Admin.Header = AdminHeader;
Admin.Main = AdminMain;
Admin.Nav = AdminNav;

export default Admin;
