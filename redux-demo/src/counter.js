import React, {Component} from 'react';
import {connect} from 'react-redux';
import Delta from './delta';
// Only using prop-types to keep this example simple.
// We would use Flow instead.
import t from 'prop-types';

class Counter extends Component {
  static propTypes = {
    counter: t.number.isRequired,
    onDecrement: t.func.isRequired,
    onIncrement: t.func.isRequired
  };

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

// This makes desired state properties
// available to this component as props.
function mapState(state) {
  const {counter} = state;
  return {counter};
}

// Functions on the object this returns
// are passed as props to this component
// and can be used as event handlers.
const mapDispatch = dispatch => ({
  onDecrement() {
    dispatch({type: 'decrement'});
  },
  onIncrement() {
    dispatch({type: 'increment'});
  }
});

export default connect(mapState, mapDispatch)(Counter);
