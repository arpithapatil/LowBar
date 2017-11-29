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
};
  













module.exports = _;