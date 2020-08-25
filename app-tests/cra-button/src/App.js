import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@espressive/cascara';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>{process.env.REACT_APP_NAME}</h1>
        <img src={logo} className='App-logo' alt='logo' />
        <Button content='Positive Cascara Button' outcome='positive' />
      </header>
    </div>
  );
}

export default App;
