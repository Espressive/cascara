import React from 'react';
import pt from 'prop-types';
// import { useParams } from 'react-router-dom';
import { AdminStructure } from '@espressive/cascara';
// import { TestLink } from '../../components';
// import { basePath as directory } from '../directory';
// import { basePath as settings } from '.';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const IntegrationsEmail = ({ children }) => {
  // const { id } = useParams();

  return (
    <AdminStructure.Main header='IntegrationsEmail'>
      {/* <TestLink to={`//${directory.path}/3`}>{directory.label} 3</TestLink> */}
      {children}
    </AdminStructure.Main>
  );
};

IntegrationsEmail.propTypes = propTypes;

export default IntegrationsEmail;
