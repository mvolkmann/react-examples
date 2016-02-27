// @flow

function dumpProps(obj: Object) {
  Object.keys(obj).forEach(key =>
    console.log(key, '=', obj[key]));
}
dumpProps({foo: 1, bar: 2});
dumpProps(7);
