import Immutable from 'immutable';

/**
 * Determines if two arrays containing primitive values
 * are equal.
 */
function primitiveArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((v1, index) => v1 === arr2[index]);
}

/**
 * Perform a deep equality check,
 * including handling Immutable objects.
 */
function deepEqual(obj, nextObj) {
  if (obj === nextObj) return true;
  if (obj === null || nextObj === null) return false;

  if (obj instanceof Immutable.Iterable &&
    nextObj instanceof Immutable.Iterable) {
    return Immutable.is(obj, nextObj);
  }

  if (typeof obj === 'object' &&
      typeof nextObj === 'object') {
    const keys = Object.keys(obj);
    const nextKeys = Object.keys(nextObj);
    if (!primitiveArraysEqual(keys, nextKeys)) return false;
    return keys.every(key => deepEqual(obj[key], nextObj[key]));
  }

  return false;
}

export default deepEqual;
