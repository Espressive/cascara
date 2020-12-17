import React from 'react';

import { useQuery } from 'react-query';

const Applications = () => {
  const { data, error, isError, isLoading, isSuccess } = useQuery(
    'application'
  );

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isSuccess) {
    return data.map((app) => <p key={app.eid}>{app.name}</p>);
  }
};

export default Applications;
