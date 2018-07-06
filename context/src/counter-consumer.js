import React, {Component} from 'react';
import {Context as CounterContext} from './counter-provider';
import {Context as FontSizeContext} from './font-size-provider';
import {string} from 'prop-types';

class CounterConsumer extends Component {
  static propTypes = {
    label: string
  };
  static defaultProps = {
    label: 'Counter'
  };

  render() {
    return (
      <FontSizeContext.Consumer>
        {fontSizeContext => (
          <CounterContext.Consumer>
            {counterContext => (
              <div style={{fontSize: fontSizeContext.fontSize}}>
                <div>
                  {this.props.label}: {counterContext.counter}
                </div>
                <button onClick={counterContext.increment}>+1</button>
                <button onClick={e => counterContext.increment(e, 3)}>
                  +3
                </button>
                <button onClick={fontSizeContext.increase}>Font Up</button>
              </div>
            )}
          </CounterContext.Consumer>
        )}
      </FontSizeContext.Consumer>
    );
  }
}

export default CounterConsumer;
