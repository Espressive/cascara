import React from 'react';
import pt from 'prop-types';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const SettingsLinkMetadata = ({ children }) => {
  // const { id } = useParams();

  return (
    <>
      <h1>SettingsLinkMetadata</h1>
      {/* <TestLink to={`//${directory.path}/3`}>{directory.label} 3</TestLink> */}
      {children}
    </>
  );
};

SettingsLinkMetadata.propTypes = propTypes;

export default SettingsLinkMetadata;
