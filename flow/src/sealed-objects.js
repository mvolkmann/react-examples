// @flow

// Sealed object
const obj1 = {foo: 1};
obj1.bar = 2; // error
obj1.foo = 2; // okay
obj1.foo = 'test'; // error

// Unsealed object
const obj2 = {};
obj2.foo = 1; // okay
obj2.bar = 'test'; // okay
