export const responseValidator = function (status) {
  return status >= 200 && status < 300; // default
};
