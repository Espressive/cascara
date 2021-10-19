import { createContext } from 'react';

const AdminContext = createContext({
  isSizeMedium: undefined,
  menuDrawer: undefined,
  menuNav: undefined,
});

export default AdminContext;
