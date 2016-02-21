// @flow
/**
 * Creates a new version of each method on obj
 * that begins with a given prefix (typically "on")
 * followed by an uppercase letter.
 */
function autobind(obj: Object, prefix: string): void {
  /* eslint prefer-reflect:0 */
  const re = new RegExp(prefix + '[A-Z]');
  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
  for (const prop: string of props) {
    if (re.test(prop)) {
      const value = obj[prop];
      if (typeof value === 'function' && prop !== 'constructor') {
        //console.log('autobinding ', prop, 'method');
        obj[prop] = value.bind(obj);
      }
    }
  }
}

export default autobind;
