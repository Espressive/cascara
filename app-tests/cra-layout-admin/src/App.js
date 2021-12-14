import React from 'react';
import { AdminStructure } from '@espressive/cascara';

const App = () => {
  return (
    <AdminStructure
      header={<AdminStructure.Header title={process.env.REACT_APP_NAME} />}
      main={<AdminStructure.Main>{'Admin.Main'}</AdminStructure.Main>}
      nav={<AdminStructure.Nav>{'Admin.Nav'}</AdminStructure.Nav>}
    />
  );
};

export default App;
