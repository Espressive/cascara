import React from 'react';

import useQueryFromURL from '../../../hooks/useQueryFromURL';

import Select from '../../Select';

const Home = () => {
  const [query, setQueryToURL] = useQueryFromURL();
  const { filter = {} } = query;

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

  return (
    <main>
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
    </main>
  );
};

export default Home;
