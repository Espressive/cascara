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
      <h4>SettingsNotifications</h4>

      <AdminStructure.Drawer style={{ padding: '1em' }}>
        <h4>Notifs Drawer</h4>
        <p>No special padding used here if someone wants to do that.</p>
      </AdminStructure.Drawer>
    </>
  );
};

SettingsNotifications.propTypes = propTypes;

export default SettingsNotifications;
