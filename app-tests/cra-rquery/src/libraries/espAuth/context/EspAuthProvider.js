import React, { useState } from 'react';

import { EspAuthContext } from './espAuthContext';
import { useLocalStorage } from '../hooks';
import useApi from '../../espApiAgent';

import LoginForm from '../components/LoginForm';

export const EspAuthProvider = ({ config, children }) => {
  const { baseURL, tokenKey = 'token' } = config;
  const [userProfile, setUserProfile] = useLocalStorage({
    key: 'profile',
    type: 'json',
  });
  const [token, setToken] = useLocalStorage({
    key: tokenKey,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token));
  const url = `${baseURL}/api/authentication/auth/login/`;
  const [sessionEntity] = useApi(url);
  const profileEntity = useApi(`${baseURL}/api/espuser/v0.1/whoami/`, {
    method: 'get',
  });

  async function login(username, password) {
    try {
      const data = new FormData();
      data.append('username', username);
      data.append('password', password);

      // exchange credentials
      const {
        data: { key: token },
      } = await sessionEntity.post({
        data,
      });

      setToken(token);
      setIsAuthenticated(true);

      const profile = await profileEntity();
      setUserProfile(profile);
    } catch (err) {
      console.warn(err);
    }
  }

  function logout() {
    setToken();
    setIsAuthenticated(false);
  }

  const content = isAuthenticated ? children : <LoginForm onSubmit={login} />;

  return (
    <EspAuthContext.Provider
      value={{
        baseURL,
        isAuthenticated,
        login,
        logout,
        userProfile,
      }}
    >
      {content}
    </EspAuthContext.Provider>
  );
};
