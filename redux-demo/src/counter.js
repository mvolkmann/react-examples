// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Delta from './delta';
import type {DispatchType, StateType} from './types';

type PropsType = {
  counter: number,
  onDecrement: () => void,
  onIncrement: () => void
};

class Counter extends Component {
  props: PropsType;

  render() {
    const {counter, onDecrement, onIncrement} = this.props;
    return (
      <div>
        <div>
          <label>Counter = </label>
          {counter}
        </div>
        <div>
          <button className="inc-btn" onClick={onIncrement}>Increment</button>
          <button className="dec-btn" onClick={onDecrement}>Decrement</button>
        </div>
        {/* Note how no props are passed to this component. */}
        <Delta />
      </div>
    );
  }
}

// Functions on the object this returns
// are passed as props to this component
// and can be used as event handlers.
const mapDispatch = (dispatch: DispatchType) => ({
  onDecrement() {
    dispatch({type: 'decrement'});
  },
  onIncrement() {
    dispatch({type: 'increment'});
  }
});

// This makes desired state properties
// available to this component as props.
function mapState({counter}: StateType) {
  return {counter};
}

export default connect(mapState, mapDispatch)(Counter);
