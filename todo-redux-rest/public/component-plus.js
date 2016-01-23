import Immutable from 'immutable';
import React from 'react'; //eslint-disable-line
import _ from 'lodash';

/**
  * Perform a deep equality check,
  * including handling Immutable objects.
  */
function deepEqual(obj, nextObj) {
  if (obj === nextObj) return true;
  if (obj === null || nextObj === null) return false;
  if (obj === undefined || nextObj === undefined) return false;

  if (obj instanceof Immutable.Iterable &&
    nextObj instanceof Immutable.Iterable) {
    return Immutable.is(obj, nextObj);
  }

  if (typeof obj === 'object' &&
      typeof nextObj === 'object') {
    const keys = Object.keys(obj);
    const nextKeys = Object.keys(nextObj);
    if (!_.isEqual(keys, nextKeys)) return false;
    return keys.every(key => deepEqual(obj[key], nextObj[key]));
  }

  return false;
}

/**
 * This is a React.Component superclass that adds
 * autobinding of all methods whose names begin with "on"
 * and a generic implementation of shouldComponentUpdate.
 *
 * To use this, write components that extend from
 * ComponentPlus instead of React.Component.
 */
class ComponentPlus extends React.Component {
  constructor() {
    super();
    this.autobind('on');
  }

  autobind(prefix) {
    /* eslint prefer-reflect:0 */
    const props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    for (const prop of props) {
      if (prop.startsWith(prefix)) {
        const value = this[prop];
        if (typeof value === 'function' && prop !== 'constructor') {
          //console.log('autobinding ', prop, 'method');
          this[prop] = value.bind(this);
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(this.props, nextProps) ||
      !deepEqual(this.state, nextState);
  }
}

export default ComponentPlus;
