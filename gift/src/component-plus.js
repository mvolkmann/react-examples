import React from 'react'; //eslint-disable-line
import _ from 'lodash';

/**
 * This is a React.Component superclass that adds
 * autobinding of all methods whose names begin with "on"
 * and an implementation of shouldComponentUpdate
 * that uses shallow compare from react-addons-shallow-compare.
 * See https://facebook.github.io/react/docs/shallow-compare.html.
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
    function diff(obj, nextObj) {
      return !_.isEqual(obj, nextObj);
    }
    return diff(this.props, nextProps) || diff(this.state, nextState);
  }
}

export default ComponentPlus;
