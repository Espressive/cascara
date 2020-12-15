import { transformRequest, transformResponse } from '../transforms';
import { responseValidator } from '../validators';

export const defaultConfig = {
  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [transformRequest],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [transformResponse],

  // `headers` are custom headers to be sent
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json',

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  // browser only
  // onUploadProgress: function (progressEvent) {
  //   // Do whatever you want with the native progress event
  // },

  // `onDownloadProgress` allows handling of progress events for downloads
  // browser only
  // onDownloadProgress: function (progressEvent) {
  //   // Do whatever you want with the native progress event
  // },

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code.
  validateStatus: responseValidator,
};
