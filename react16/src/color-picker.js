// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import './color-picker.css';

import type {ActionType, DispatchType, StateType} from './types';

type PropsType = {
  color: string,
  dispatch: DispatchType
};

class ColorPicker extends Component<PropsType> {
  onChange = (event: Object) => {
    const action: ActionType = {type: 'setColor', payload: event.target.value};
    this.props.dispatch(action);
  };

  render() {
    const {color} = this.props;

    return (
      <div className="color-picker">
        <select onChange={this.onChange} value={color}>
          <option>red</option>
          <option>green</option>
          <option>blue</option>
        </select>
      </div>
    );
  }
}

const mapState = (state: StateType): PropsType => ({
  color: state.color,
  dispatch: () => undefined // will be replaced by connect
});

export default connect(mapState)(ColorPicker);
