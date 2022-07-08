const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid string when an object is provided', () => {
    const obj = {
      name: 'João Dantas',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=João Dantas&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'João Dantas',
      habilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=João Dantas&habilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'João Dantas',
      habilities: { first: 'JS', second: 'TDD' },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=João Dantas&profession=developer';

    expect(parse(qs)).toEqual({ name: 'João Dantas', profession: 'developer' });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=João Dantas';

    expect(parse(qs)).toEqual({ name: 'João Dantas' });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=João&habilities=JS,TDD';

    expect(parse(qs)).toEqual({ name: 'João', habilities: ['JS', 'TDD'] });
  });
});
