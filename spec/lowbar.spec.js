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