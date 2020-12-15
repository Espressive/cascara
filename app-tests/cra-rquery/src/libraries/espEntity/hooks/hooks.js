import apiAgent from '../../espApiAgent';

import { Session, Profile } from '../entities';

const entities = {
  session: Session,
  profile: Profile,
};

const mutationMethods = ['post', 'patch'];

export function useEspressiveEntity(entityName, endpointName, config) {
  const { baseURL, onUploadProgress, onDownloadProgress } = config;
  const entity = entities[entityName] || {};
  const {
    endpoints = [],
    requestInterceptor,
    requestErrorHandler,
    responseInterceptor,
    reponseErrorHandler,
    transformRequest,
    transformResponse,
    shape,
    validate,
  } = entity;

  const endpointConfig = endpoints
    .filter((endpoint) => endpoint.name === endpointName)
    .pop();

  if (!endpointConfig) {
    // Boom!
  }

  const { method, options: endpointOptions, url } = endpointConfig;

  const mergedConfig = {
    method,
    onDownloadProgress,
    onUploadProgress,
    requestInterceptor,
    requestErrorHandler,
    responseInterceptor,
    reponseErrorHandler,
    transformRequest,
    transformResponse,
    url,
    baseURL,
  };

  /**
   * A data dependency for react-query
   *
   *
   * @param {String} entityName The entity's name in react query
   * @param {Object} key The query data
   * @returns {Promise} */
  function apiQuery(queryEntityName, key) {
    if (queryEntityName !== entityName) {
      // Boom - wrong entity!
    }

    return apiCall(key);
  }

  /**
   * A call to the API that can be used outside react-query
   *
   * Param interpolation
   * All properties in the params object will be matched and have their values swapped
   * in the URL, for example:
   *
   * Given the URL: https://example.com/api/:version/users/:userId/friends/:friendId/
   * and the params object
   * {
   *   version: 'v1',
   *   userId: 'user_01',
   *   friendId: 'user_03',
   * }
   *
   * The final URL will be: https://example.com/api/v1/users/user_01/friends/user_03/
   *
   * @param {Object} payload
   * @param {Object} payload.data The data to be sent
   * @param {Object} payload.filter esp-filter object decscribing filters to be included
   * @param {Object} payload.page pagination settings, if supported by the endpoint
   * @param {Object} payload.params a dictionary describing the params to be interpolated with the URL */
  function apiCall(payload) {
    const { data, filter, page, params } = payload;
    const isMutation = mutationMethods.includes(mergedConfig.method);
    let endpointUrl = mergedConfig.url;
    let queryParams = '';

    debugger;

    let finalConfig = {
      ...mergedConfig,
    };

    if (endpointOptions.urlParams && params) {
      endpointUrl = Object.keys(params).map(
        (updatedUrl, key) =>
          updatedUrl.replace(new RegExp(`:${key}`, 'g'), params[key]),
        endpointUrl
      );
    }

    if (endpointOptions.espFilters && filter) {
      // handle esp-filters
      const espFilters = '';

      queryParams = `esp_filters="${espFilters}"`;
    }

    if (endpointOptions.pagination && page) {
      const { page: currentPage = 1, limit = 10 } = page;
      // todo: @manu - compute limit -> offset

      queryParams = `${
        Boolean(queryParams.length) ? '&' : ''
      }page="${currentPage}&limit="${limit}"`;
    }

    /** */
    if (isMutation && data) {
      finalConfig.data = data;
    }

    finalConfig.url = `${endpointUrl}${
      Boolean(queryParams) ? `?${queryParams}` : ''
    }`;

    return apiAgent(finalConfig);
  }

  return {
    apiQuery,
    apiCall,
    shape,
    validate,
  };
}
