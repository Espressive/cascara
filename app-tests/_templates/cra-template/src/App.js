import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>{process.env.REACT_APP_NAME}</h1>
        <img alt='logo' className='App-logo' src={logo} />
      </header>
    </div>
  );
};

export default App;
