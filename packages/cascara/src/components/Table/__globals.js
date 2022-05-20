import {
  ascend,
  compose,
  descend,
  identity,
  ifElse,
  is,
  prop,
  sortWith,
  toLower,
} from 'ramda';
import { SORT_ORDER } from './state/sortingReducer';

const sortDateFn = (data, sortAttribute, sortOrder) => {
  const descendingDate = (a, b) =>
    new Date(a[sortAttribute]).getTime() - new Date(b[sortAttribute]).getTime();

  const ascendingDate = (a, b) =>
    new Date(b[sortAttribute]).getTime() - new Date(a[sortAttribute]).getTime();

  const sortData = sortWith([
    sortOrder === SORT_ORDER.ASCENDING ? ascendingDate : descendingDate,
    compose(ifElse(is(String), toLower, identity), prop(sortAttribute)),
  ]);
  return sortData(data);
};

const sortMonthFn = (data, sortAttribute, sortOrder) => {
  const ascendingMonth = (a, b) => {
    const Amonth = a[sortAttribute].slice(-2);
    const Bmonth = b[sortAttribute].slice(-2);
    return Amonth.localeCompare(Bmonth, undefined, { numeric: true });
  };

  const descendingMonth = (a, b) => {
    const Amonth = a[sortAttribute].slice(-2);
    const Bmonth = b[sortAttribute].slice(-2);
    return Bmonth.localeCompare(Amonth, undefined, { numeric: true });
  };
  const sortData = sortWith([
    sortOrder === SORT_ORDER.ASCENDING ? ascendingMonth : descendingMonth,
    compose(ifElse(is(String), toLower, identity), prop(sortAttribute)),
  ]);
  return sortData(data);
};

const sortWeekFn = (data, sortAttribute, sortOrder) => {
  const ascendingWeek = (a, b) => {
    const Aweek = a[sortAttribute].slice(-2);
    const Bweek = b[sortAttribute].slice(-2);
    return Aweek.localeCompare(Bweek);
  };

  const descendingWeek = (a, b) => {
    const Aweek = a[sortAttribute].slice(-2);
    const Bweek = b[sortAttribute].slice(-2);
    return Bweek.localeCompare(Aweek);
  };
  const sortData = sortWith([
    sortOrder === SORT_ORDER.ASCENDING ? ascendingWeek : descendingWeek,
    compose(ifElse(is(String), toLower, identity), prop(sortAttribute)),
  ]);
  return sortData(data);
};

const defaultSortFn = (data, sortAttribute, sortOrder) => {
  const sortData = sortWith([
    (sortOrder === SORT_ORDER.ASCENDING ? ascend : descend)(
      compose(ifElse(is(String), toLower, identity), prop(sortAttribute))
    ),
  ]);
  return sortData(data);
};

const sortDataType = (data, sortAttribute, sortOrder, moduleType) => {
  switch (moduleType) {
    case 'date':
    case 'datetime':
      return sortDateFn(data, sortAttribute, sortOrder);
    case 'month':
      return sortMonthFn(data, sortAttribute, sortOrder);
    case 'week':
      return sortWeekFn(data, sortAttribute, sortOrder);
    default:
      return defaultSortFn(data, sortAttribute, sortOrder);
  }
};

export default sortDataType;
