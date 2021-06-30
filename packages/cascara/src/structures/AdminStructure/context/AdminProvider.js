import React, { useState } from 'react';
import pt from 'prop-types';
import AdminContext from './AdminContext';
import { useMediaQuery } from '../../../hooks';
import { useMenuState } from 'reakit';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

// const popperInlineStyle = {
//   inset: null,
//   position: 'initial',
//   transform: null,
// };

const noInlineStyles = {
  enabled: true,
  fn: ({ state }) => {
    state.styles.popper.position = null;
    state.styles.popper.inset = null;
    state.styles.popper.transform = null;
  },
  name: 'noInlineStyles',
  phase: 'beforeWrite',
  requires: ['applyStyles'],
};

const AdminProvider = ({ children }) => {
  const [drawer, setDrawer] = useState();

  const isSizeMedium = useMediaQuery('(max-width: 768px)');
  const menuDrawer = useMenuState();
  const menuNav = useMenuState({
    animated: true,
    orientation: 'vertical',
    unstable_popperModifiers: [noInlineStyles],
    visible: true,
  });
  const isSizeSmall = useMediaQuery(
    '(max-width: 320px)',
    menuNav.hide,
    menuNav.show
  );

  return (
    <AdminContext.Provider
      value={{
        drawer,
        isSizeMedium,
        isSizeSmall,
        menuDrawer,
        menuNav,
        setDrawer,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = propTypes;

export default AdminProvider;
