const _ = {};
Object.values = require('object.values');

_.identity = function (value) {
  return value;
};

_.values = function (list) {
  if (typeof list !== 'object') return [];
  if (Array.isArray(list)) {
    return list;
  } else {
    return (Object.values(list));
  }
};

_.first = function (list, n) {
  if ((typeof list === 'number' || typeof list === 'boolean') && typeof n === 'number') return [];
  if (typeof list !== 'string' && typeof list !== 'object') return;
  if (!n) return list[0];
  else {
    if (typeof list === 'string')
      return list.split('').slice(0, n);
    else if (Array.isArray(list))
      return list.slice(0, n);
    else return [];
  }
};

_.last = function (list, n) {
  if ((typeof list === 'number' || typeof list === 'boolean') && typeof n === 'number') return [];
  if (typeof list !== 'string' && typeof list !== 'object') return;
  if (!n) return list[list.length - 1];
  else {
    if (typeof list === 'string')
      return list.split('').slice(-n);
    else if (Array.isArray(list))
      return list.slice(-n);
    else return [];

  }
};

_.each = (list, iteratee, context = this) => {
  if (typeof list === 'string') {
    for (var i = 0; i < list.length; i++)
      iteratee.call(context, list[i], i, list);
  }
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      iteratee.call(context, list[i], i, list);
    }
  }
  if (typeof list === 'object' && !Array.isArray(list)) {
    for (let key in list) {
      iteratee.call(context, list[key], key, list);
    }
  }
  return list;

};

_.indexOf = (list, value, isSorted) => {
  if (typeof list === 'string') list = list.split('');
  if (!Array.isArray(list) && typeof list !== 'string') return -1;
  let res = -1;
  const binSearch = (list, value) => {
    let low = 0;
    let high = list.length - 1;
    while (low <= high) {
      let mid = Math.floor((high + low) / 2);
      if (list[mid] === value) return mid;
      if (value < list[mid]) high = mid - 1;
      else low = mid + 1;
    }
    return -1;
  };
  if (isSorted) res = binSearch(list, value);
  else {
    for (let i = 0; i < list.length; i++) {
      if (value === list[i]) {
        res = i;
        break;
      }
    }
  }
  return res;
};

_.filter = (list, predicate, context = this) => {
  const res = [];
  if (list === undefined || list === null) return [];
  if (typeof list === 'string') {
    list = list.split('');
  }
  if (!predicate) return list;
  _.each(list, function (item) {
    if (predicate.call(context, item)) res.push(item);
  });
  return res;
};

_.negate = (predicate) => {
  return function () {
    return !predicate.apply(this, arguments);
  };
};

_.reject = (list, predicate, context = this) => {
  if (typeof list === 'string') {
    list = list.split('');
  }
  const rev = _.negate(predicate);
  if (!predicate) return [];
  return _.filter.call(null, list, rev, context);
};

_.uniq = (list, isSorted) => {
  const res = [];
  if (!Array.isArray(list) && typeof list !== 'string') return [];
  if (!isSorted)
    _.each(list, (item) => {
      if (_.indexOf(res, item) === -1) res.push(item);
    });
  if (isSorted)
    _.each(list, (item) => {
      if (_.indexOf(res, item) === -1) res.push(item);
    });
  return res;
};

_.map = (list, iteratee = _.identity, context = this) => {
  const res = [];
  _.each(list, (item, i, list) => {
    res.push(iteratee.call(context, item, i, list));
  });
  return res;
};

_.contains = (list, value, indexFrom = 0) => {
  if (!Array.isArray(list) && typeof list === 'object') {
    for (let key in list) {
      if (list[key] === value) return true;
    }
    return false;
  }
  return _.indexOf(list.slice(indexFrom), value) !== -1 ? true : false;
};

_.pluck = (list, propertyName) => _.map(list, (item) => item[propertyName]);

_.reduce = (list, iteratee, acc, context = this) => {
  iteratee = iteratee.bind(context);
  if (!acc) {
    acc = list[0];
    list = list.slice(1);
  }
  _.each(list, function (item, index, list) {
    acc = iteratee(acc, item, index, list);
  });
  return acc;
};

_.every = (list, predicate, context = this) => {
  let res = true;
  _.each(list, function (item) {
    if (!predicate.call(context, item)) {
      res = false;
      return res;
    }
  });
  return res;
};

_.some = (list, predicate, context = this) => {
  let res = false;
  _.each(list, function (item) {
    if (predicate.call(context, item)) {
      res = true;
      return res;
    }
  });
  return res;
};

_.extend = (start, ...objects) => {
  return _.reduce(objects, (acc, item) => {
    for (let key in item) {
      acc[key] = item[key];
    }
    return acc;
  }, start);
};

_.defaults = (start, ...objects) => {
  return _.reduce(objects, (acc, item) => {
    for (let key in item) {
      if (!(key in acc)) {
        acc[key] = item[key];
      }
    }
    return acc;
  }, start);
};

_.shuffle = (list) => {
  var newList = [];
  if (typeof list === 'string') newList = list.split('');
  if (typeof list === 'object') newList = Object.values(list);
  newList = newList.slice();
  let n = newList.length, placeholder, index;
  while (n) {
    index = Math.floor(Math.random() * n--);
    placeholder = newList[n];
    newList[n] = newList[index];
    newList[index] = placeholder;
  }
  
};











module.exports = _;