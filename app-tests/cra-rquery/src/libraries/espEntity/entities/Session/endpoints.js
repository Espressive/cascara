export const endpoints = [
  /**
   * basic Authentication operations */
  {
    method: 'post',
    name: 'create',
    options: {
      espFilters: false,
      pagination: false,
      urlParams: false,
      urlSearch: false,
    },
    url: '/api/authentication/auth/login/',
  },
  {
    method: 'post',
    name: 'terminate',
    options: {
      espFilters: false,
      pagination: false,
      urlParams: false,
      urlSearch: false,
    },
    url: '/api/authentication/auth/logout/',
  },
];
