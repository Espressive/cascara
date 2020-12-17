export const requestInterceptor = function (config) {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Token ${token}`,
    };
  }

  return config;
};

export const requestErrorHandler = function (error) {
  // Do something with request error
  return Promise.reject(error);
};
