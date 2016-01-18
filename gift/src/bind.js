export default function autobind(obj, prefix) {
  /* eslint prefer-reflect:0 */
  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
  for (const prop of props) {
    if (prop.startsWith(prefix)) {
      const value = obj[prop];
      if (typeof value === 'function' && prop !== 'constructor') {
        //console.log('autobinding ', prop, 'method');
        obj[prop] = value.bind(obj);
      }
    }
  }
}
