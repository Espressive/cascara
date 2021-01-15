import React, { useState } from 'react';
import pt from 'prop-types';

const propTypes = {
  onSubmit: pt.func.isRequired,
};

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameInputChange(event) {
    event.preventDefault();
    const {
      target: { value: newUserName },
    } = event;

    setUsername(newUserName);
  }

  function handlePasswordInputChange(event) {
    event.preventDefault();
    const {
      target: { value: newPassword },
    } = event;

    setPassword(newPassword);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(username, password);
  }

  return (
    <div id='login'>
      <form
        onSubmit={handleSubmit}
        className='ui clearing segment form'
        style={{ minWidth: '25rem' }}
      >
        <div className='field'>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type={'text'}
            name='username'
            onChange={handleUsernameInputChange}
            value={username}
          />
        </div>
        <div className='field'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type={'password'}
            name='password'
            onChange={handlePasswordInputChange}
            value={password}
          />
        </div>
        <button className='ui primary right floated button' type={'submit'}>
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = propTypes;

export default LoginForm;
