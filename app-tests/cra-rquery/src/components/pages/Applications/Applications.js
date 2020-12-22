import React, { useContext } from 'react';

import { useQuery } from 'react-query';
import { useEspressiveEntity } from '../../../libraries/espEntity';
import { EspAuthContext } from '../../../libraries/espAuth';

import { Table } from '@espressive/cascara';

const Applications = () => {
  const { baseURL } = useContext(EspAuthContext);
  const Application = useEspressiveEntity('application', 'list', { baseURL });
  const { data, error, isError, isLoading } = useQuery(
    'application',
    Application.apiQuery
  );

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const applicationsList = data?.data?.results || [];
  const { description, name, eid, is_protected, type } = Application.shape;
  const dataConfig = {
    display: [eid, name, description, type, is_protected],
  };

  return <Table data={applicationsList} dataConfig={dataConfig} />;
};

export default Applications;
