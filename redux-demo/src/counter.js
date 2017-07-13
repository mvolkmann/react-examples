// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Delta from './delta';
import type {DispatchType, StateType} from './types';

import './counter.css';

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
      <div className="counter">
        <div className="button-row">
          <button className="dec-btn" onClick={this.onDecrement}>
            -
          </button>
          {counter}
          <button className="inc-btn" onClick={this.onIncrement}>
            +
          </button>
        </div>
        <Delta />
      </div>
    );
  }
}

const mapState = ({counter}: StateType) => ({counter});
export default connect(mapState)(Counter);
