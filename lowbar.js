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
  













module.exports = _;