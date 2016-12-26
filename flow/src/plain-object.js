// @flow

// eslint-disable-next-line flowtype/no-weak-types
function dumpProps(obj: Object) {
  Object.keys(obj).forEach(key =>
    console.log(key, '=', obj[key]));
}
dumpProps({foo: 1, bar: 2});
dumpProps(7); // error
