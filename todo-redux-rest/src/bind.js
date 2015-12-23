/**
 * This performs partial application on a given function.
 * It returns a new function that invokes the given function
 * with fixed initial arguments.
 */
function pa(fn, ...args) {
  return fn.bind(null, ...args);
}

/**
 * This performs partial application on a given method.
 * It returns a new function that invokes the given method
 * on the given object with fixed initial arguments.
 */
function pam(obj, fn, ...args) {
  return fn.bind(obj, ...args);
}

/**
 * For each method in a given object
 * whose name matches a given regular expression,
 * this adds a function to the object that is bound to it.
 * For example, if the regular expression is /^on/
 * and the object has a method named "onFoo",
 * this will add a function to the object whose name is "onFooFn"
 * where inside the function "this" is bound to the object.
 */
function bindMethods(regExp, obj) {
  if (!(regExp instanceof RegExp)) {
    throw new Error('bindMethods first argument must be a RegExp');
  }

  const proto = obj.constructor.prototype;

  // Can't use Object.keys below because methods aren't enumerable.
  const names = Object.getOwnPropertyNames(proto);

  names.forEach(name => {
    const value = obj[name];
    if (typeof value === 'function' && regExp.test(name)) {
      obj[name + 'Fn'] = value.bind(obj);
    }
  });
}

export {bindMethods, pa, pam};
