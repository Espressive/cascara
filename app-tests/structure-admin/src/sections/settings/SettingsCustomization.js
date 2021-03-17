import React from 'react';
import pt from 'prop-types';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const SettingsCustomization = ({ children }) => {
  // const { id } = useParams();

  return (
    <>
      <h1>SettingsCustomization</h1>
      {/* <TestLink to={`//${directory.path}/3`}>{directory.label} 3</TestLink> */}
      {children}
    </>
  );
};

SettingsCustomization.propTypes = propTypes;

export default SettingsCustomization;
