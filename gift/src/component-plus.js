import React from 'react'; //eslint-disable-line
import _ from 'lodash';

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

  // This implements will not work with Immutable objects.
  // See the version in todo-redux-rest for that.
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState);
  }
}

export default ComponentPlus;
