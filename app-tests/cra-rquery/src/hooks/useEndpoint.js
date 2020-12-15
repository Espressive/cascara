import { useState } from 'react';

const usePagination = (page = 1, limit = 10) => {
  const [currentLimit, setLimit] = useState(limit);
  const [currentPage, setPage] = useState(page);

  const setPagination = (page, limit) => {
    if (page) {
      setPage(page);
    }

    if (limit) {
      setLimit(limit);
    }
  };

  return [
    {
      limit: currentLimit,
      page: currentPage,
    },
    setPagination,
  ];
};

export default usePagination;
