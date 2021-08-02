const getStatusFromDataLength = (length) => {
  const isLoading = !length && length !== 0;
  const isEmpty = !isLoading && length === 0;

  return {
    isEmpty,
    isLoading,
  };
};

export default getStatusFromDataLength;
