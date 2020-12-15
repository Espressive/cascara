import { useLocation, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

const parseQueryFromSearch = (searchString) => {
  const parsedSearch = queryString.parse(searchString);

  const result = Object.entries(parsedSearch).reduce((all, [k, v]) => {
    const [namespace, covid] = k.split('_');

    // if no _ is found
    if (!namespace) {
      all[k] = v;

      return all;
    }

    if (!all[namespace]) {
      all[namespace] = {};
    }

    all[namespace][covid] = v;

    return all;
  }, {});

  return result;
};

const useQueryFromUrl = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const query = parseQueryFromSearch(location.search);

  const obj2str = (obj, namespace) => {
    const plain = Object.entries(obj).reduce((all, [key, value]) => {
      const isObject = typeof value === 'object';
      const plain = `${
        isObject
          ? `${obj2str(value, key)}&`
          : `${namespace ? `${namespace}_` : ''}${key}=${value}&`
      }`;

      return `${all}${plain}`;
    }, '');

    return `${plain.substr(0, plain.length - 1)}`;
  };

  const setQueryToURL = (newQuery, mode = 'merge') => {
    console.table(searchParams);
    debugger;
    const currentQuery = parseQueryFromSearch(searchParams);

    const plainQuery =
      mode === 'merge'
        ? obj2str({
            ...currentQuery,
            ...newQuery,
          })
        : obj2str(newQuery);

    setSearchParams(plainQuery);
  };

  return [query, setQueryToURL];
};

export default useQueryFromUrl;
