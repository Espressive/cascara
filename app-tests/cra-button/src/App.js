import React from 'react';
import './App.css';
import { Button } from '@espressive/cascara';

const App = () => {
  return (
    <header className='App-header'>
      <h1>{process.env.REACT_APP_NAME}</h1>
      <Button content='Positive Cascara Button' outcome='positive' />
    </header>
  );
};

export default App;
