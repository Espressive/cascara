const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const int = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return bytes
    ? `${Math.round(bytes / Math.pow(1024, int), 2)} ${sizes[int]}`
    : null;
};

export { bytesToSize };
