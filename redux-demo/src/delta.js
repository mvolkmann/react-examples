// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {DispatchType, StateType} from './types';

type PropsType = {
  delta: number,
  onDeltaChange: () => void
};

class Delta extends Component {
  props: PropsType;

  render() {
    return (
      <div>
        <label>Delta</label>
        <input
          type="number"
          onChange={this.props.onDeltaChange}
          value={this.props.delta}
        />
      </div>
    );
  }
}

// Functions on the object this returns
// are passed as props to this component
// and can be used as event handlers.
const mapDispatch = (dispatch: DispatchType) => ({
  onDeltaChange(e: SyntheticInputEvent) {
    dispatch({
      type: 'deltaChange',
      payload: Number(e.target.value)
    });
  }
});

// This makes desired state properties
// available to this component as props.
function mapState({delta}: StateType) {
  return {delta};
}

export default connect(mapState, mapDispatch)(Delta);
