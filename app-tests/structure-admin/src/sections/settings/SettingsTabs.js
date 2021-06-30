import React from 'react';
import pt from 'prop-types';
import settings from './';
import TestLink from '../../components/TestLink';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const SettingsTabs = ({ children }) => {
  return (
    <div>
      {settings.routes.children.map((route) => (
        <TestLink key={route.path} to={`//${route.path}`}>
          {route.label}
        </TestLink>
      ))}
    </div>
  );
};

SettingsTabs.propTypes = propTypes;

export default SettingsTabs;
