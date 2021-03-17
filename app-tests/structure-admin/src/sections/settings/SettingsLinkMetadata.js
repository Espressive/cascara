import React from 'react';
import pt from 'prop-types';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const SettingsLinkMetadata = ({ children }) => {
  // const { id } = useParams();

  return <h4>SettingsLinkMetadata</h4>;
};

SettingsLinkMetadata.propTypes = propTypes;

export default SettingsLinkMetadata;
