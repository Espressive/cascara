import axios from 'axios';

import { defaultConfig } from './config';
import { fakeAxiosAdapter as apiMock } from './adapters';
import { requestInterceptor, requestErrorHandler } from './interceptors';

if (process.env.NODE_ENV === 'test') {
  defaultConfig.adapter = apiMock.handleRequest;
}

const apiAgent = axios.create(defaultConfig);

// note @manu: add response interceptors here if needed..
apiAgent.interceptors.request.use(requestInterceptor, requestErrorHandler);

export const useApiAgent = (config) => {
  const apiAgentInsntance = apiAgent.create(config);

  return [apiAgentInsntance, apiMock];
};

export default apiAgent;
export { apiMock };
