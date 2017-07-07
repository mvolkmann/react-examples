// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Delta from './delta';
import type {DispatchType, StateType} from './types';

type PropsType = {
  counter: number,
  dispatch: DispatchType
};

class Counter extends Component {
  props: PropsType;

  onDecrement = () => this.props.dispatch({type: 'decrement'});
  onIncrement = () => this.props.dispatch({type: 'increment'});

  render() {
    const {counter} = this.props;
    return (
      <div>
        <div>
          <label>Counter = </label>
          {counter}
        </div>
        <div>
          <button className="inc-btn" onClick={this.onIncrement}>
            Increment
          </button>
          <button className="dec-btn" onClick={this.onDecrement}>
            Decrement
          </button>
        </div>
        {/* Note how no props are passed to this component. */}
        <Delta />
      </div>
    );
  }
}

const mapState = ({counter}: StateType) => ({counter});
export default connect(mapState)(Counter);
