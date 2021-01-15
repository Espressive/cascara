import axios from 'axios';

import { defaultConfig } from './config';
import { fakeAxiosAdapter as apiMock } from './adapters';
import { requestInterceptor, requestErrorHandler } from './interceptors';

const baseConfig = {
  ...defaultConfig,
};

if (process.env.NODE_ENV === 'test') {
  baseConfig.adapter = apiMock.handleRequest;
}

function useApi(url, config = {}) {
  debugger;
  const apiAgent = axios.create({ ...baseConfig, url, ...config });

  // note @manu: add response interceptors here if needed..
  apiAgent.interceptors.request.use(requestInterceptor, requestErrorHandler);

  return [apiAgent, apiMock];
}

export default useApi;
export { apiMock };
