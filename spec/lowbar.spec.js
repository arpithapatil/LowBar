const expect = require('chai').expect;
const path = require('path');


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

});