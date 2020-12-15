export const requestInterceptor = function (config) {
  debugger;

  return config;
};

export const requestErrorHandler = function (error) {
  // Do something with request error
  return Promise.reject(error);
};
