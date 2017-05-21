// @flow

function foo(value: mixed) {
  // This works.
  if (value === null || typeof value !== 'object') return;
  // Flow doesn't complain about the next line
  // because if knows value is an object.
  Object.keys(value).forEach(key => console.log(key));
}

function isObject(value: mixed) {
  return typeof value === 'object' && value !== null;
}

function bar(value: mixed) {
  // This does not work despite using the same logic,
  // just moved to another function (isObject).
  if (!isObject(value)) return;
  // Flow complains about the next line with
  // "Expected object instead of mixed"
  Object.keys(value).forEach(key => console.log(key));
}

foo({a: 1});
bar({a: 1});
