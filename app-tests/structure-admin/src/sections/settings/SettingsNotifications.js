import { AdminStructure } from '@espressive/cascara';
import React from 'react';
import pt from 'prop-types';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const SettingsNotifications = ({ children }) => {
  // const { id } = useParams();

  return (
    <>
      <h1>SettingsNotifications</h1>
      {/* <TestLink to={`//${directory.path}/3`}>{directory.label} 3</TestLink> */}
      {children}
      <AdminStructure.Drawer>
        <h1>Notifs Drawer</h1>
      </AdminStructure.Drawer>
    </>
  );
};

SettingsNotifications.propTypes = propTypes;

export default SettingsNotifications;
