// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {DispatchType, StateType} from './types';

import './delta.css';

type PropsType = {
  delta: number,
  dispatch: DispatchType
};

class Delta extends Component {
  props: PropsType;

  //onDeltaChange = (e: SyntheticInputEvent) =>
  onDeltaChange = e =>
    this.props.dispatch({
      type: 'deltaChange',
      payload: Number(e.target.value)
    });

  render() {
    return (
      <div className="delta">
        <label>Delta</label>
        <input
          type="number"
          onChange={this.onDeltaChange}
          value={this.props.delta}
        />
      </div>
    );
  }
}

const mapState = ({delta}: StateType) => ({delta});
export default connect(mapState)(Delta);
