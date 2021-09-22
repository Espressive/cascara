const getStatusFromDataLength = (length) => {
  const isLoading = Boolean(!length && length !== 0);
  const isEmpty = Boolean(!isLoading && length === 0);

  return {
    isEmpty,
    isLoading,
  };
};

export default getStatusFromDataLength;
