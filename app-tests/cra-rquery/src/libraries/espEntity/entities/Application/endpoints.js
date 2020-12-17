export const endpoints = [
  /**
   * basic Authentication operations */
  {
    method: 'get',
    name: 'list',
    options: {
      espFilters: true,
      pagination: true,
      urlParams: false,
      urlSearch: false,
    },
    url: '/api/barista/v0.1/application/',
  },
];
