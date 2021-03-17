import React, { useCallback, useState } from 'react';
import pt from 'prop-types';
import { AdminStructure } from '@espressive/cascara';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const SettingsBranding = ({ children }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => setCount((count) => count + 1), []);
  return (
    <>
      <h1>SettingsBranding</h1>
      {/* <TestLink to={`//${directory.path}/3`}>{directory.label} 3</TestLink> */}
      {children}
      <button onClick={handleIncrement} type='button'>
        Add
      </button>
      <p>{count}</p>
      <AdminStructure.Drawer>
        <h1>First Drawer Yes</h1>
        <p>{count}</p>
      </AdminStructure.Drawer>
    </>
  );
};

SettingsBranding.propTypes = propTypes;

export default SettingsBranding;
