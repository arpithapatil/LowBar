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

_.each = (list, iteratee) => {
  for (let i = 0; i<list.length; i++) {
    iteratee(list[i], i, list);
  }
};
  













module.exports = _;