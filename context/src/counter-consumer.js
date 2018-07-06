import React, {Component} from 'react';
import {Context} from './counter-provider';
import {string} from 'prop-types';

class MyConsumer extends Component {
  static propTypes = {
    label: string
  };
  static defaultProps = {
    label: 'Counter'
  };

  render() {
    return (
      <Context.Consumer>
        {context => (
          <div>
            <div>
              {this.props.label}: {context.counter}
            </div>
            <button onClick={context.increment}>+</button>
            <button onClick={e => context.increment(e, 3)}>+3</button>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default MyConsumer;
