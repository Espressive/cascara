import pt from 'prop-types';

const getDataState = (data) => {
  // If data is not defined, we are in a loading state
  const isLoading = Boolean(data === undefined) || Boolean(data === null);
  // If data is defined but it is explicitly empty, we are in an empty state
  const isEmpty = !isLoading && data.length === 0;

  return {
    isEmpty,
    isLoading,
  };
};

const dataStateProps = {
  // A widget can show as empty with an empty data array
  isEmpty: pt.bool,
  // A widget can show as loading with no data defined
  isLoading: pt.bool,
};

export { getDataState, dataStateProps };
