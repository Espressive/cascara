import { mocks } from './mocks';
import { endpoints } from './endpoints';
import { validate, shape } from './schema';
import * as interceptors from './interceptors';
import * as transforms from './transforms';

export default {
  endpoints,
  mocks,
  validate,
  shape,
  ...interceptors,
  ...transforms,
};
