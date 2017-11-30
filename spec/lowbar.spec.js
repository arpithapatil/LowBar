const expect = require('chai').expect;
const path = require('path');
const sinon = require('sinon');


const _ = require(path.join(__dirname, '../lowbar'));

describe('#identity', () => {
  it('it is a function', () => {
    expect(_.identity).to.be.a('function');
  });
  
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
  it('it is a function', () => {
    expect(_.values).to.be.a('function');
  });
  
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
  it('it is a function', () => {
    expect(_.first).to.be.a('function');
  });
  it('returns the first element of an array', () => {
    expect(_.first([1,2,3,4])).to.equal(1);
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
  it('it is a function', () => {
    expect(_.last).to.be.a('function');
  });
  it('returns the last element of an array', () => {
    expect(_.last([1,2,3,4,5])).to.equal(5);
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
  it('it is a function', () => {
    expect(_.each).to.be.a('function');
  });
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
    function func (i) {
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
  it('it is a function', () => {
    expect(_.indexOf).to.be.a('function');
  });
  it('returns the index of the first instance of the sencond argument', () => {
    expect(_.indexOf([1,2,3,4,5], 3)).to.equal(2);
  });
  it('returns the index of the given target in string', function () {
    var result = _.indexOf('hello','o');
    var expected = 4;
    expect(result).to.equal(expected);
  });
  it('returns index of first instance of second argument using binary search', () => {
    expect(_.indexOf([1,2,3,4,5], 3, true)).to.equal(2);
    expect(_.indexOf([2,3,1,5,4], 3, true)).to.equal(-1);
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
  it('is a function', function () {
    expect(_.filter).to.be.a('function');
  });
  
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

  it('adds context to predicate', () => {
    const arr = [1,2,3,4,5];
    const res = _.filter(arr, function (i) {
      return i % this === 0; 
    }, 2); 
    expect(res).to.eql([2,4]);
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
  it('is a function', function () {
    expect(_.negate).to.be.a('function');
  });
  it('negates a predicate function', () => {
    const isTrue = () => 2%2===0; 
    const isFalse = _.negate(isTrue);
    expect(isFalse()).to.equal(false);
  });
});
  