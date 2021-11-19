import AdminStructure from './AdminStructure';
import { Drawer, Header, Main, Nav } from './components';

AdminStructure.Drawer = Drawer;
AdminStructure.Header = Header;
AdminStructure.Main = Main;
AdminStructure.Nav = Nav;

export { propTypes as adminStructurePropTypes } from './AdminStructure';
export default AdminStructure;
