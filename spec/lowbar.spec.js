const expect = require('chai').expect;
const path = require('path');
const sinon = require('sinon');


const _ = require(path.join(__dirname, '../lowbar'));

describe('#identity', () => {

  it('returns undefined when an arguement is not given', () => {
    expect(_.identity()).to.equal(undefined);
  });

  it('returns the same value that is used as the argument.', () => {
    expect(_.identity('abc')).to.equal('abc');
    const array = [1, 2, 3];
    expect(_.identity(array)).to.eql(array);
    const obj = { 1: 1, 2: 2, 3: 3 };
    expect(_.identity(obj)).to.eql(obj);
    expect(_.identity(1)).to.equal(1);
    expect(_.identity(true)).to.equal(true);
    expect(_.identity(null)).to.equal(null);
    expect(_.identity(undefined)).to.equal(undefined);
  });
});

describe('#values', () => {

  it('returns an empty array when input is not an object', () => {
    expect(_.values()).to.eql([]);
    expect(_.values('abc')).to.eql([]);
    expect(_.values(345)).to.eql([]);
    expect(_.values(undefined)).to.eql([]);
  });

  it('return all of the values of the list in an array', () => {
    expect(_.values([1, 2, 3])).to.eql([1, 2, 3]);
    expect(_.values({ 1: 1, 2: 2, 3: 3 })).to.eql([1, 2, 3]);
  });

  it('Output is an array', () => {
    expect(_.values([1, 2, 3])).to.eql([1, 2, 3]);
    expect(_.values({ 1: 1, 2: 2, 3: 3 })).to.eql([1, 2, 3]);
  });

  it('Input is an object', () => {
    expect(_.values([1, 2, 3])).to.eql([1, 2, 3]);
    expect(_.values({ 1: 1, 2: 2, 3: 3 })).to.eql([1, 2, 3]);
  });
});

describe('#first', () => {
 
  it('returns the first element of an array', () => {
    expect(_.first([1, 2, 3, 4])).to.equal(1);
  });
  it('returns undefined when arguements are not given', () => {
    expect(_.first()).to.equal(undefined);
  });

  it('returns undefined when list is not an array or string and n is not given', () => {
    expect(_.first({ 1: 1, 2: 2, 3: 3 })).to.equal(undefined);
    expect(_.first(1)).to.equal(undefined);
    expect(_.first(true)).to.equal(undefined);
  });
  it('returns an empty array when list is not an array or string and n is a number', () => {
    expect(_.first({ 1: 1, 2: 2, 3: 3 }, 1)).to.eql([]);
    expect(_.first(1, 1)).to.eql([]);
    expect(_.first(true, 1)).to.eql([]);
    expect(_.first(null, 1)).to.eql([]);
  });

  it('returns the first element of list, n will return the first n elements of list.', () => {
    expect(_.first('abc', 1)).to.eql(['a']);
    expect(_.first([1, 2, 3], 1)).to.eql([1]);
    expect(_.first([1, 2, 3, 4, 5, 6], 4)).to.eql([1, 2, 3, 4]);
    expect(_.first('hello')).to.eql('h');
  });

});

describe('#last', () => {
 
  it('returns the last element of an array', () => {
    expect(_.last([1, 2, 3, 4, 5])).to.equal(5);
  });
  it('returns undefined when arguements are not given', () => {
    expect(_.last()).to.equal(undefined);
  });

  it('returns undefined when list is not an array or string and n not given', () => {
    expect(_.last({ 1: 1, 2: 2, 3: 3 })).to.equal(undefined);
    expect(_.last(1)).to.equal(undefined);
    expect(_.last(true)).to.equal(undefined);
  });
  it('returns an empty array when list is not an array or string and n is a number', () => {
    expect(_.last({ 1: 1, 2: 2, 3: 3 }, 1)).to.eql([]);
    expect(_.last(1, 1)).to.eql([]);
    expect(_.last(true, 1)).to.eql([]);
    expect(_.last(null, 1)).to.eql([]);
  });

  it('returns the last element of list, n will return the last n elements of list.', () => {
    expect(_.last('abc', 1)).to.eql(['c']);
    expect(_.last([1, 2, 3], 1)).to.eql([3]);
    expect(_.last([1, 2, 3, 4, 5, 6], 4)).to.eql([3, 4, 5, 6]);
    expect(_.last('hello')).to.eql('o');

  });

});

describe('#each', () => {
  
  it('calls the iteratee for every item in an array', () => {
    let spy = sinon.spy();
    let arr = [1, 2, 3, 4];
    _.each(arr, spy);
    expect(spy.callCount).to.equal(4);
  });
  it('calls the iteratee passsing each element of the array as the 1st argument', function () {
    const spy = sinon.spy();
    _.each([1, 2, 3], spy);
    expect(spy.firstCall.calledWithExactly(1, 0, [1, 2, 3])).to.equal(true);
    expect(spy.secondCall.calledWithExactly(2, 1, [1, 2, 3])).to.equal(true);
    expect(spy.thirdCall.calledWithExactly(3, 2, [1, 2, 3])).to.equal(true);
  });

  it('calls the iteratee passsing each element of an object as the 1st argument', function () {
    const spy = sinon.spy();
    _.each({ one: 1, two: 2, three: 3 }, spy);
    expect(spy.firstCall.calledWithExactly(1, 'one', { one: 1, two: 2, three: 3 })).to.equal(true);
    expect(spy.secondCall.calledWithExactly(2, 'two', { one: 1, two: 2, three: 3 })).to.equal(true);
    expect(spy.thirdCall.calledWithExactly(3, 'three', { one: 1, two: 2, three: 3 })).to.equal(true);
  });
  it('calls the iteratee passsing each element of string as the 1st argument', function () {
    const spy = sinon.spy();
    _.each('abc', spy);
    expect(spy.firstCall.calledWithExactly('a', 0, 'abc')).to.equal(true);
    expect(spy.secondCall.calledWithExactly('b', 1, 'abc')).to.equal(true);
    expect(spy.thirdCall.calledWithExactly('c', 2, 'abc')).to.equal(true);
  });
  it('uses different context to this if third argument is passed', () => {
    const arr = [];
    function func(i) {
      this.push(i);
    }
    _.each(['a', 'b', 'c'], func, arr);
    expect(arr.length).to.equal(3);
  });
  it('returns list if passed list is number or null', function () {
    expect(_.each(23)).to.equal(23);
    expect(_.each(null)).to.equal(null);
  });

  it('returns undefined if list is undefined', function () {
    expect(_.each(undefined)).to.equal(undefined);
  });

});

describe('#indexOf', () => {
  
  it('returns the index of the first instance of the sencond argument', () => {
    expect(_.indexOf([1, 2, 3, 4, 5], 3)).to.equal(2);
  });
  it('returns the index of the given target in string', function () {
    var result = _.indexOf('hello', 'o');
    var expected = 4;
    expect(result).to.equal(expected);
  });
  it('returns index of first instance of second argument using binary search', () => {
    expect(_.indexOf([1, 2, 3, 4, 5], 3, true)).to.equal(2);
    expect(_.indexOf([2, 3, 1, 5, 4], 3, true)).to.equal(-1);
  });

  it('returns -1 if inputs are not passed correctly', function () {
    expect(_.indexOf([1, 2, 3])).to.equal(-1);
    expect(_.indexOf(3)).to.equal(-1);
    expect(_.indexOf()).to.equal(-1);
    expect(_.indexOf([], 4, true)).to.equal(-1);
    expect(_.indexOf('', 'h', true)).to.equal(-1);
    expect(_.indexOf(6)).to.equal(-1);
    expect(_.indexOf({ 1: 1, 2: 2, 3: 3 })).to.equal(-1);
  });

  it('returns -1 if target is not in array', function () {
    expect(_.indexOf([2, 1, 3], 4, false)).to.equal(-1);
  });
});

describe('#filter', function () {
 
  it('returns an array of true elements for the given array', function () {
    expect(_.filter([1, 2, 3, 4, 5, 6], function check(num) { return num % 2 === 0; })).to.eql([2, 4, 6]);
    expect(_.filter([2, 4, 5, 6, 10, 11], function check(num) { return num % 2 === 0; })).to.eql([2, 4, 6, 10]);
  });
  it('returns an array of true elements for the given object', function () {
    var input = { one: 1, two: 2, three: 3, four: 4 };
    function isEven(num) {
      return num % 2 === 0;
    }
    var result = _.filter(input, isEven);
    var expected = [2, 4];
    expect(result).to.eql(expected);
  });

  it('returns an array of true elements for the given string', function () {
    expect(_.filter('abc', function check(item) { return item === 'b'; })).to.eql(['b']);
  });

  it('adds context to predicate when third arguement is passed', () => {
    const arr = [1, 2, 3, 4, 5];
    const res = _.filter(arr, function (i) {
      return i % this === 0;
    }, 2);
    expect(res).to.eql([2, 4]);
  });

  it('returns an empty array if inputs are not passed correctly', function () {
    const predicate = function (num) { return num % 2 === 0; };
    expect(_.filter(123, function check(item) { return item === 123; })).to.eql([]);
    expect(_.filter()).to.eql([]);
    expect(_.filter(undefined, predicate)).to.eql([]);
    expect(_.filter(null)).to.eql([]);
    expect(_.filter([], predicate)).to.eql([]);
    expect(_.filter('', predicate)).to.eql([]);
    expect(_.filter({}, predicate)).to.eql([]);
  });

  it('returns list if predicate not given', function () {
    expect(_.filter([1, 2, 3])).to.eql([1, 2, 3]);
  });
});

describe('#negate', () => {

  it('it is a function', () => {
    expect(_.negate).to.be.a('function');
  });
  
  it('negates a predicate function', () => {
    const isTrue = () => 2 % 2 === 0;
    const isFalse = _.negate(isTrue);
    expect(isFalse()).to.equal(false);
  });
});

describe('#reject', function () {
 
  it('returns an array of elements that fails the truth test when the given list is an array', function () {
    expect(_.reject([1, 2, 3, 4, 5, 6], function check(num) { return num % 2 === 0; })).to.eql([1, 3, 5]);
    expect(_.reject([2, 4, 5, 6, 10, 11], function check(num) { return num % 2 === 0; })).to.eql([5, 11]);
  });

  it('adds context to predicate when third argument is passed', () => {
    const arr = [1, 2, 3, 4, 5];
    const res = _.reject(arr, function (i) {
      return i % this === 0;
    }, 2);
    expect(res).to.eql([1, 3, 5]);
  });

  it('returns an array of elements that fails the truth test when the given list is an object', function () {
    var input = { one: 1, two: 2, three: 3, four: 4 };
    function isEven(num) {
      return num % 2 === 0;
    }
    var result = _.reject(input, isEven);
    var expected = [1, 3];
    expect(result).to.eql(expected);
  });

  it('returns an array of elements that fails the truth test when the given list is a string', function () {
    expect(_.reject('abc', function check(item) { return item === 'b'; })).to.eql(['a', 'c']);

  });

  it('returns an empty array if inputs are not passed correctly', function () {
    const fn = function (num) {
      return num > 2;
    };
    expect(_.reject(123, function check(item) { return item === 123; })).to.eql([]);
    expect(_.reject()).to.eql([]);
    expect(_.reject([1, 2, 3])).to.eql([]);
    expect(_.reject(undefined, fn)).to.eql([]);
    expect(_.reject(null, fn)).to.eql([]);
    expect(_.reject([], fn)).to.eql([]);
    expect(_.reject('', fn)).to.eql([]);
    expect(_.reject({}, fn)).to.eql([]);
  });
});

describe('#uniq', function () {
 
  it('returns duplicate free version of the array', function () {
    expect(_.uniq([1, 2, 3, 4, 2, 1])).to.eql([1, 2, 3, 4]);
    expect(_.uniq([5, 8, 33, 15, 33, 5])).to.eql([5, 8, 33, 15]);
  });

  it('returns duplicate free version of the string', function () {
    expect(_.uniq('apple')).to.eql(['a', 'p', 'l', 'e']);
    expect(_.uniq('abcb')).to.eql(['a', 'b', 'c']);
  });

  it('returns empty array if list passed is not string or an array', function () {
    expect(_.uniq(56)).to.eql([]);
    expect(_.uniq({ 1: 1, 2: 2, 3: 3, 4: 1 })).to.eql([]);
    expect(_.uniq(undefined)).to.eql([]);
    expect(_.uniq(null)).to.eql([]);
    expect(_.uniq()).to.eql([]);
    expect(_.uniq([])).to.eql([]);
    expect(_.uniq('')).to.eql([]);
    expect(_.uniq({})).to.eql([]);
  });

  it('Checks if function works on unsorted numeric array with duplicates', function () {
    var input = [6, 7, 8, 3, 8, 2, 1, 2, 8, 8];
    var actual = _.uniq(input, false);
    var expected = [6, 7, 8, 3, 2, 1];
    expect(actual).to.eql(expected);
  });

  it('Checks if function works on sorted numeric array with duplicates', function () {
    var input = [-1, -1, 2, 2, 2, 4, 5, 5, 5, 9];
    var actual = _.uniq(input, true);
    var expected = [-1, 2, 4, 5, 9];
    expect(actual).to.eql(expected);
  });

  it('Checks if function works on sorted numeric array with duplicates if we also pass a iteratee function (which in this case is non-monotonic)', function () {
    var input = [-1, -1, 2, 2, 2, 4, 5, 5, 5, 9];
    var actual = _.uniq(input, true, function (num) { return -num; });
    var expected = [-1, 2, 4, 5, 9];
    expect(actual).to.eql(expected);

  });

});

describe('#map', () => {
 
  it('returns list entered as first argument when no iteratee is passed', () => {
    expect(_.map([1, 2, 3, 4, 5])).to.eql([1, 2, 3, 4, 5]);
  });

  it('returns a new array of values by matching item in array', function () {
    var input = [1, 3, 6, 8, 9];
    function multiply(n) {
      return n * 3;
    }
    expect(_.map(input, multiply)).to.eql([3, 9, 18, 24, 27]);
  });

  it('returns a new array of values by matching item in object', function () {
    var input = { one: 1, three: 3, six: 6 };
    function multiply(n) {
      return n * 2;
    }
    expect(_.map(input, multiply)).to.eql([2, 6, 12]);
  });

  it('returns a new array of values by matching item in string', function () {
    var input = 'apple';
    function changeCase(item) {
      return item.toUpperCase();
    }
    expect(_.map(input, changeCase)).to.eql(['A', 'P', 'P', 'L', 'E']);
  });

  it('returns an empty array if inputs are not passed correctly', function () {
    const fn = function (n) {
      return n * 2;
    };
    expect(_.map()).to.eql([]);
    expect(_.map(23, fn)).to.eql([]);
    expect(_.map(undefined, fn)).to.eql([]);
    expect(_.map(null, fn)).to.eql([]);
    expect(_.map('', fn)).to.eql([]);
    expect(_.map([], fn)).to.eql([]);
    expect(_.map({}, fn)).to.eql([]);
  });

  it('returns NaN for nested arrays', function () {
    expect(_.map([1, 2, 3, 4, [5, 6, 7], 8, 9], function (n) { return n * n; })).to.eql([1, 4, 9, 16, NaN, 64, 81]);
  });

  it('adds context to iteratee', () => {
    const res = _.map([1, 2, 3, 4, 5], function (i) {
      return i * this;
    }, 2);
    expect(res).to.eql([2, 4, 6, 8, 10]);
  });
});

describe('#contains', () => {
 
  it('returns true if list contains value', () => {
    expect(_.contains([1, 2, 3, 4, 5], 5)).to.equal(true);
  });

  it('returns false if list does not contain value', () => {
    expect(_.contains([1, 2, 3, 4, 5], 6)).to.equal(false);
  });

  it('returns true if value in object', () => {
    expect(_.contains({ a: 1, b: 2, c: 3 }, 3)).to.equal(true);
  });

  it('returns false if value not in object', () => {
    expect(_.contains({ a: 1, b: 2, c: 3 }, 4)).to.equal(false);
  });

  it('returns true or false when indexFrom argument is included', () => {
    expect(_.contains([1, 2, 3, 4, 5], 5, 3)).to.equal(true);
    expect(_.contains([1, 2, 3, 4, 5], 1, 1)).to.equal(false);
  });
});

describe('#pluck', () => {

  it('returns the values of an object', () => {
    expect(_.pluck([{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }], 'c')).to.eql([3, 6]);
    expect(_.pluck([[1, 2, 3], [1, 2, 3], [1, 2, 3]], 2)).to.eql([3, 3, 3]);
    expect(_.pluck([{ a: 1, b: 3 }, { a: 3, c: 4 }, { a: 4, d: 6 }], 'a')).to.eql([1, 3, 4]);
  });

  it('returns empty array if given invalid arguments', () => {
    expect(_.pluck([{ a: 1 }, { a: 3 }, { a: 4 }], 'b')).to.eql([undefined, undefined, undefined]);
    expect(_.pluck('hello', 5)).to.eql([undefined, undefined, undefined, undefined, undefined]);
    expect(_.pluck(NaN, 0)).to.eql([]);
    expect(_.pluck(undefined, undefined)).to.eql([]);
    expect(_.pluck(123, 0)).to.eql([]);

  });
});

describe('#reduce', () => {

  it('reduces array to one number', () => {
    expect(_.reduce([1, 2, 3], (acc, num) => acc + num, 0)).to.equal(6);
  });

  it('reduces array to one number when no acc is passed', () => {
    expect(_.reduce([1, 2, 3], (acc, num) => acc + num)).to.equal(6);
  });

  it('returns reduced array', () => {
    expect(_.reduce([1, 2, 3], (acc, num) => acc.concat(num * 2), [])).to.eql([2, 4, 6]);
  });

  it('reduces object', () => {
    expect(_.reduce({ a: 1, b: 2, c: 3 }, (acc, num) => acc.concat(num * 2), [])).to.eql([2, 4, 6]);
  });

  it('returns reduced object', () => {
    expect(_.reduce({ a: 1, b: 2, c: 3 }, (acc, num) => {
      acc[num] = num * 2;
      return acc;
    }, {})).to.eql({ 1: 2, 2: 4, 3: 6 });
  });

  it('context can be change of iteratee', () => {
    expect(_.reduce({ a: 1, b: 2, c: 3 }, function (acc, num) {
      acc.push(num * this);
      return acc;
    }, [], 2)).to.eql([2, 4, 6]);
  });
});

describe('#every', () => {

  it('returns true if every item in a array passes predicate', () => {
    expect(_.every([2, 4, 6, 8], (i) => i % 2 === 0)).to.equal(true);
    expect(_.every([1, 3, 5, 7], (i) => i % 2 !== 0)).to.equal(true);
  });

  it('returns false if any item in an array fails predicate', () => {
    expect(_.every([2, 3, 6, 8], (i) => i % 2 === 0)).to.equal(false);
    expect(_.every([1, 2, 5, 7], (i) => i % 2 !== 0)).to.equal(false);
  });

  it('works when objects are passed as an argument', () => {
    expect(_.every({ a: 1, b: 2, c: 3 }, (i) => i % 2 !== 0)).to.equal(false);
    expect(_.every({ a: 2, b: 4, c: 6, d: 8 }, (i) => i % 2 === 0)).to.equal(true);

  });

  it('applies context to predicate function', () => {
    expect(_.every([2, 4, 6, 8], function (i) {
      return i % this === 0;
    }, 2)).to.equal(true);
    expect(_.every({ a: 2, b: 4, c: 6, d: 8 }, function (i) {
      return i % this === 0;
    }, 2)).to.equal(true);
  });

  it('returns true for invalid arguments', () => {
    expect(_.every(5)).to.equal(true);
    expect(_.every(null)).to.equal(true);
    expect(_.every(undefined)).to.equal(true);
  });
});

describe('#some', () => {

  it('returns true if any item in an array passes predicate', () => {
    expect(_.some([2, 4, 6, 7], (i) => i % 2 !== 0)).to.equal(true);
    expect(_.some([1, 2, 3, 5], (i) => i % 2 === 0)).to.equal(true);
  });

  it('returns false if no items in an array pass the predicate', () => {
    expect(_.some([2, 4, 6, 8], (i) => i % 2 !== 0)).to.equal(false);
    expect(_.some([1, 3, 5, 7], (i) => i % 2 === 0)).to.equal(false);
  });

  it('works when objects are passed as an argument', () => {
    expect(_.some({ a: 1, b: 2, c: 3 }, (i) => i % 2 !== 0)).to.equal(true);
    expect(_.some({ a: 2, b: 4, c: 7, d: 8 }, (i) => i % 2 === 0)).to.equal(true);
  });

  it('applies context to _.some', () => {
    expect(_.some({ a: 2, b: 7, c: 9, d: 11 }, function (i) {
      return i % this === 0;
    }, 2)).to.equal(true);
  });

  it('returns true for invalid arguments', () => {
    expect(_.some(5)).to.equal(false);
    expect(_.some(null)).to.equal(false);
    expect(_.some(undefined)).to.equal(false);
  });
});

describe('#extend', () => {

  it('returns joined object', () => {
    expect(_.extend({name:'Bob'}, {age: 26})).to.eql({name: 'Bob', age: 26});
    expect(_.extend({name:'Bob', age: 23}, {age: 26}, {car: 'Audi'})).to.eql({name: 'Bob', age: 26, car: 'Audi'});
  });

  it('does not merge non object sources into the destination', () => {
    expect(_.extend({name: 'Bob'},{age: 20}, 7)).to.eql({name: 'Bob', age: 20}); 
    expect(_.extend({name: 'Bob'},{age: 20}, [7])).to.eql({0: 7,name: 'Bob', age: 20}); 
  });

  it('tests that nested objects are referneces and not duplicates', () => {
    const start = {fruit:'apple'}; 
    const nested = {color:{car:'Audi'}}; 
    const joined = _.extend(start, nested); 
    expect(joined.b).to.equal(nested.b);
  });

  it('returns joined object with nested objects', () => {
    expect(_.extend({name: 'Bob'}, {favourites: {color: 'pink'}})).to.eql({name: 'Bob', favourites: {color: 'pink'}});
  });
  
  it('returns the destination if only proper inputs given', () => {
    const str = 'apple', arr = ['apple'], obj = {0:'apple'}, num = 7, undef = undefined;
    expect(_.extend(arr)).to.equal(arr);
    expect(_.extend(str)).to.equal(str);
    expect(_.extend(obj)).to.equal(obj);
    expect(_.extend(num)).to.equal(num);
    expect(_.extend(undef)).to.equal(undef);
  });
});

describe('#defaults', () => {

  it('adds only undefined keys to object', () => {
    expect(_.defaults({ a: 1, b: 2 }, { b: 3, c: 4 })).to.eql({ a: 1, b: 2, c: 4 });

  });

  it('edge cases', () => {
    expect(_.extend(5)).to.equal(5);
    expect(_.extend(undefined)).to.equal(undefined);
    expect(_.extend([])).to.eql([]);
  });
});

describe('#shuffle', () => {

  it('it returns the shuffled copy of the list ', () => {
    const array = [1, 2, 3, 4, 5];
    const str = 'apple';
    const object = { 0: 0, 1: 1, 2: 2, 3: 3 };
    expect(_.shuffle(array)).to.not.eql(array);
    expect(_.shuffle(str)).to.not.eql(str);
    expect(_.shuffle(object)).to.not.eql(object);
  });

  it('it returns an array with same length ', () => {
    expect(_.shuffle([1, 2, 3, 4]).length).to.eql(4);
  });

  it('it does not mutate the given array to it ', () => {
    var arr = [1, 2, 3, 4];
    expect(_.shuffle(arr)).to.not.equal(arr);
  });

  it('it returns an empty array when input is not valid', () => {
    expect(_.shuffle()).to.eql([]);
    expect(_.shuffle(567)).to.eql([]);
    expect(_.shuffle(undefined)).to.eql([]);
    expect(_.shuffle([])).to.eql([]);
    expect(_.shuffle({})).to.eql([]);
  });
});

describe('#once', () => {

  it('it is a function', () => {
    expect(_.once).to.be.a('function');
  });
 
  it('returns version of function that can only be called once', () => {
    const spy = sinon.spy();
    const func = _.once(spy);
    func();
    func();
    expect(spy.callCount).to.equal(1);
  });
});

describe('#invoke', () => {

  it('returns array with method passed on each item', () => {
    expect(_.invoke([[1, 2, 3], [4, 5, 6]], 'reverse')).to.eql([[3, 2, 1], [6, 5, 4]]);
    expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);

  });

  it('applies passed arguments to method', () => {
    expect(_.invoke([1, 2, 3], 'toString', 10)).to.eql(['1', '2', '3']);
    expect(_.invoke([[1, 2, 3], [4, 5, 6]], 'concat', 0)).to.eql([[1, 2, 3, 0], [4, 5, 6, 0]]);

  });

  it('it returns an empty array when input is not a valid list', () => {
    expect(_.invoke()).to.eql([]);
    expect(_.invoke(57)).to.eql([]);
    expect(_.invoke(undefined)).to.eql([]);
    expect(_.invoke([])).to.eql([]);
    expect(_.invoke({})).to.eql([]);
  });
});

describe('#sortBy', () => {

  it('returns array that is sorted in ascending order by iteratee', () => {
    expect(_.sortBy([1,2,3,4,5], (item) => {
      return Math.cos(item);
    })).to.eql([3,4,2,5,1]);
  });

  it('returns array of sorted values when given an object', () => {
    expect(_.sortBy({a:1,b:2,c:3,d:4,e:5}, (item) => {
      return Math.cos(item);
    })).to.eql([3,4,2,5,1]);
  });

  it('applies context to the iteratee', () => {
    const res = _.sortBy([1,2,3,4,5], function (item) {
      return 1/Math.pow(item, this);
    }, 2);
    expect(res).to.eql([5,4,3,2,1]);
  });

  it('returns an empty array for invalid argument', () => {
    expect(_.sortBy(555)).to.eql([]);
    expect(_.sortBy(undefined)).to.eql([]);		
    expect(_.sortBy([])).to.eql([]);			
    expect(_.sortBy({})).to.eql([]);			
  });

});

describe('#zip', () => {

  it('it returns an array when given a list of strings as arguments', () => {
    expect(_.zip('a','b')).to.eql(['a', 'b']);
  });
  
  it('it returns an array when given a list of arrays', () => {
    expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]);
  });
  
  it('it returns an array when given one string', () => {
    expect(_.zip('ab')).to.eql([['a'], ['b']]);
  });

  it('returns an array with elements that are undefined when number and dimension of arrays do not match', () => {
    expect(_.zip([1,2,3], ['a', 'b'])).to.eql([[1,'a'], [2, 'b'], [3, undefined]]);
  });

  it('it returns an empty array when not given an array or string', () => {
    expect(_.zip()).to.eql([]);
    expect(_.zip(false)).to.eql([]);
    expect(_.zip(null)).to.eql([]);
    expect(_.zip(1)).to.eql([]);
    expect(_.zip({a:'a', b:'b'})).to.eql([]);
  });
});

describe('#sortedIndex', () => {

  it('returns correct index at whch value should be inserted to sorted array', () => {
    expect(_.sortedIndex([1,2,3,5], 4)).to.equal(3);
    expect(_.sortedIndex([1,3,4,5], 2)).to.equal(1);
    expect(_.sortedIndex([1,3,4,5,7,8,9], 10)).to.equal(6);   
  });

  it('applies iteratee to sort', () => {
    expect(_.sortedIndex([1,2,3,4], 5, (n) => Math.cos(n))).to.equal(3);
  });

  it('if iteratee is a string sort objects using iteratee as key', () => {
    expect(_.sortedIndex([{a:1, b:2}, {a:3, b:1}, {a:4, c:1}], 2, 'a')).to.equal(1);
  });

  it('applies context to iteratee', () => {
    const context = {multiply: item => item * 2};
    expect(_.sortedIndex([1,2,3,5], 4, function (item) {
      return this.multiply(item);
    }, context)).to.equal(3);
  });

  it('returns 0 if invalid argument is passed', () => {
    expect(_.sortedIndex(5)).to.equal(0);
    expect(_.sortedIndex(undefined)).to.equal(0);
    expect(_.sortedIndex([])).to.equal(0);
    expect(_.sortedIndex({})).to.equal(0);
  }); 
});

describe('#flatten', () => {
  
  it('returns flattened array when given nested array', () => {
    const arr = [1,2,[3,4,5,[6,7], 8], 9]; 
    expect(_.flatten(arr)).to.eql([1,2,3,4,5,6,7,8,9]);
  });

  it('flattens one level of array when true is passed as second argument', () => {
    const arr = [1,2,[3,4,5,[6,7], 8], 9]; 			
    expect(_.flatten(arr, true)).to.eql([1,2,3,4,5,[6,7], 8, 9]);
  });

  it('returns empty array if invalid argument is passed', () => {
    expect(_.flatten(5)).to.eql([]);
    expect(_.flatten(undefined)).to.eql([]);
    expect(_.flatten([])).to.eql([]);
    expect(_.flatten({})).to.eql([]);
  });
});

describe('#intersection', () => {

  it('returns array which contains only interescting valuse', () => {
    expect(_.intersection([1,2,3], [1,2,5,6], [1,2,9])).to.eql([1,2]);
  });

  it('returns empty array if invalid argument is passed', () => {
    expect(_.intersection(5)).to.eql([]);
    expect(_.intersection(undefined)).to.eql([]);
    expect(_.intersection([])).to.eql([]);
    expect(_.intersection({})).to.eql([]);
  });
});

describe('#difference', () => {

  it('returns values which are not present in other arrays', () => {
    expect(_.difference([1,2,3,4,5], [3,4,5])).to.eql([1,2]);
    expect(_.difference(['a', 'b', 'c', 'd'], ['c', 'd'])).to.eql(['a', 'b']);
  });

  it('returns values present in object but not in other array', () => {
    expect(_.difference({a:1, b:2, c:3, d:4, e:5}, [3,4,5])).to.eql([1,2]);
  });

  it('returns empty array if invalid argument is passed', () => {
    expect(_.difference(5)).to.eql([]);
    expect(_.difference(undefined)).to.eql([]);
    expect(_.difference([])).to.eql([]);
    expect(_.difference({})).to.eql([]);
  });
});

describe('#memoize', () => {

  it('returns a function that behaves the same way as the function passed', () => {
    const hello = () => 'hello';
    const memHello = _.memoize(hello);
    expect(memHello()).to.equal('hello');
    const add = (a,b) => a + b;
    const memAdd = _.memoize(add);
    expect(memAdd(1,2)).to.equal(3);
  });

  it('function only called once if same argument is passed multiple times', () => {
    const spy = sinon.spy(); 
    const spyMem = _.memoize(spy); 
    spyMem('hello');
    spyMem('hello');
    spyMem('hello');			
    expect(spy.callCount).to.equal(1);
  });

  it('caches result of passed function', () => {
    const double = (n) => n*2; 
    const doubleMem = _.memoize(double); 
    doubleMem(2); 
    doubleMem(4); 
    doubleMem(8); 
    expect(doubleMem.cache).to.eql({2:4, 4:8, 8:16});			
  });
 
});

describe('#delay', () => {

  beforeEach(() => {
    this.clock = sinon.useFakeTimers(); 
  });
  afterEach(() => {
    this.clock.restore();
  });

  it('calls passed function after set period of ms', () => {
    const spy = sinon.spy(); 
    _.delay(spy, 200);
    expect(spy.callCount).to.equal(0); 
    this.clock.tick(200); 
    expect(spy.callCount).to.equal(1); 			
  });

  it('calls function with passed arguments', () => {
    const spy = sinon.spy(); 
    _.delay(spy, 200, 'a', 'b');
    this.clock.tick(200); 
    expect(spy.calledWithExactly('a', 'b')).to.equal(true);
  });
});

describe('#where', () => {

  it('returns array of objects which have the properties passed as second argument', () => {
    const arr = [
      {a:2, b:3, c:4}, 
      {a:1, c:9}, 
      {a:2, b:3, d:4}, 
      {c:2, d:8}
    ];
    const res = [
      {a:2, b:3, c:4},
      {a:2, b:3, d:4}
    ];
    expect(_.where(arr, {a:2, b:3})).to.eql(res);
  });

  it('returns an array from the string containing the properties passed', () => {
    expect(_.where('abc', {0: 'a'})).to.eql(['a']);
    expect(_.where('abc', {0: 'b'})).to.eql(['b']);
    expect(_.where('abc', {0: 'c'})).to.eql(['c']);
  });

  it('returns an empty array when not an object or string', () => {
    expect(_.where()).to.eql([]);
    expect(_.where(5)).to.eql([]);
    expect(_.where(true)).to.eql([]);
  });

  it('returns an array when given a string', () => {
    expect(_.where('a')).to.eql(['a']);
    expect(_.where('ab')).to.eql(['a','b']);
  });

  it('returns an array from the array containing the properties passed', () => {
    const list = [
      {
        name: 'batman',
        age: 34,
        gender: 'male'
      },
      {
        name: 'superman',
        age: 29,
        gender: 'male'
      },
      {
        name: 'wonderwoman',
        age: 31,
        gender: 'female'
      },
      {
        name: 'catwoman',
        age: 25,
        gender: 'female'
      }
    ];
    expect(_.where(list, {gender: 'female'})).to.eql([
      {
        name: 'wonderwoman',
        age: 31,
        gender: 'female'
      },
      {
        name: 'catwoman',
        age: 25,
        gender: 'female'
      }
    ]);
    expect(_.where(list, {age: 29})).to.eql([{
      name:'superman',
      age: 29,
      gender: 'male'
    }]);

  });

});

describe('#throttle', () => {

  beforeEach(() => {
    this.clock = sinon.useFakeTimers(); 
  });
  afterEach(() => {
    this.clock.restore();
  });
  it('calls the passed functon only once per wait period', () => {
    const spy = sinon.spy();
    const throttled = _.throttle(spy, 200); 
    throttled();
    throttled();
    throttled();
    throttled();
    throttled();			
    throttled();			
    expect(spy.callCount).to.equal(1);
    this.clock.tick(200); 
    throttled();
    expect(spy.callCount).to.equal(2);
  });

  it('returns result of passed function', () => {
    const double = (n) => n*2; 
    const doublThrottle = _.throttle(double); 
    expect(doublThrottle(2)).to.equal(4);
  });

});

describe('#partial', () => {

  it('returns function with arguments partially passed', () => {
    const sub = (a, b) => b-a; 
    const sub5 = _.partial(sub, 5); 
    expect(sub5(20)).to.equal(15);
  });

  it('returns partial has same functionality as passed function when no second argument passed', () => {
    const sub = (a, b) => b-a; 
    const subPart = _.partial(sub); 
    expect(subPart(5, 20)).to.equal(15);			
  });

  it('passing _ specifies argument should not be pre-filled in', () => {
    const sub = (a, b) => b-a; 
    const subPart = _.partial(sub, _, 20); 			
    expect(subPart(5)).to.equal(15);
  });

  it('does not change this value of original function', () => {
    const context = {no:20}; 
    let sub = function (a) {
      return this.no-a;
    }; 		
    sub = sub.bind(context); 
    const subPart = _.partial(sub); 	
    expect(subPart(10)).to.equal(10);
  });
});


