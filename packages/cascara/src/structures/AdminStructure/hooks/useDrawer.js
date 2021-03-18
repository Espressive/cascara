// This hook will add a data attribute to the html document as a side
// effect. It will also remove the same attribute when the component unmounts.

import { AdminContext } from '../context';
import { useContext, useEffect } from 'react';
import compare from 'react-fast-compare';

const useDrawer = (drawer) => {
  const { drawer: prevDrawer, setDrawer } = useContext(AdminContext);

  const isUpdated = !compare(drawer, prevDrawer);

  useEffect(() => {
    // Setup
    setDrawer(drawer);

    // Teardown
    return () => {
      setDrawer(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run once
  }, []);

  useEffect(() => {
    if (isUpdated) {
      setDrawer(drawer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run once
  }, [isUpdated]);
};

export default useDrawer;
