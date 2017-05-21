// @flow

// Sealed object
const obj1 = {foo: 1};
obj1.bar = 2; // flow error

// Unsealed object
const obj2 = {};
obj2.foo = 1;
obj2.bar = 2;
