export const endpoints = [
  /**
   * basic CRUD operations */
  {
    method: 'get',
    name: 'whoAmI',
    options: {
      espFilters: false,
      pagination: false,
      urlParams: false,
      urlSearch: false,
    },
    url: '/api/espuser/v0.1/whoami/',
  },
];
