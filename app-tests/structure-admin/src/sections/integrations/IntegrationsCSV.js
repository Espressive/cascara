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

const IntegrationsCSV = ({ children }) => {
  // const { id } = useParams();

  return (
    <AdminStructure.Main header='IntegrationsCSV'>
      {/* <TestLink to={`//${directory.path}/3`}>{directory.label} 3</TestLink> */}
      {children}
    </AdminStructure.Main>
  );
};

IntegrationsCSV.propTypes = propTypes;

export default IntegrationsCSV;
