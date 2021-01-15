import React, { useContext } from 'react';

import { useQuery } from 'react-query';
import { useEspressiveEntity } from '../../../libraries/espEntity';
import { EspAuthContext } from '../../../libraries/espAuth';
import useQueryFromURL from '../../../hooks/useQueryFromURL';

import { Table } from '@espressive/cascara';
import Select from '../../Select';

const Applications = () => {
  const { baseURL } = useContext(EspAuthContext);
  const [query, setQueryToURL] = useQueryFromURL({
    filter: {
      status: 'active',
      internal: true,
    },
    page: {
      page: 1,
      limit: 10,
    },
  });
  const { filter } = query;
  const ApplicationEntity = useEspressiveEntity('application', 'list', {
    baseURL,
  });
  const { data, error, isError, isLoading } = useQuery(
    ['application', { ...query }],
    ApplicationEntity.apiQuery
  );

  const filterByStatusOptions = [
    {
      key: 'statusActive',
      label: 'Active',
      value: 'active',
    },
    {
      key: 'statusInactive',
      label: 'Inactive',
      value: 'inactive',
    },
  ];

  const filterByInternalOptions = [
    {
      key: 'isInternal',
      label: 'Internal',
      value: 'true',
    },
    {
      key: 'isExternal',
      label: 'External',
      value: 'false',
    },
  ];

  const handleFilterChange = ({ name, value }) => {
    const newQuery = {
      ...query,
      filter: {
        ...query.filter,
        [name]: value,
      },
    };

    setQueryToURL(newQuery);
  };

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const applicationsList = data?.data?.results || [];
  const {
    description,
    name,
    eid,
    is_protected,
    type,
  } = ApplicationEntity.shape;
  const dataConfig = {
    display: [eid, name, description, type, is_protected],
  };

  return (
    <section>
      <label htmlFor={'status'}>
        Status: <br />
        <Select
          value={filter.status}
          name={'status'}
          onSelect={handleFilterChange}
          options={filterByStatusOptions}
          placeholder={'Select a status'}
        />
        <br />
      </label>

      <label htmlFor={'internal'}>
        Internal: <br />
        <Select
          value={filter.internal}
          name={'internal'}
          onSelect={handleFilterChange}
          options={filterByInternalOptions}
          placeholder={'Select an option'}
        />
        <br />
      </label>
      <br />
      <Table data={applicationsList} dataConfig={dataConfig} />
    </section>
  );
};

export default Applications;
