import React, { useCallback, useState } from 'react';
import { AdminStructure } from '@espressive/cascara';

const SettingsBranding = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => setCount((count) => count + 1), []);
  return (
    <>
      <h4>SettingsBranding</h4>

      <button
        className='ui basic button'
        onClick={handleIncrement}
        type='button'
      >
        Add
      </button>
      <div className='ui black label'>{count}</div>

      <AdminStructure.Drawer style={{ padding: '2em' }}>
        <h4>Count In Drawer</h4>
        <div className='ui black label'>{count}</div>
      </AdminStructure.Drawer>
    </>
  );
};

export default SettingsBranding;
