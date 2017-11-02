// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import './swatch.css';

import type {StateType} from './types';

type PropsType = {
  color: string
};

class Swatch extends Component<PropsType> {
  render() {
    const style = {backgroundColor: this.props.color};
    return <div className="swatch" style={style} />;
  }
}

const mapState = (state: StateType): PropsType => ({
  color: state.color
});

export default connect(mapState)(Swatch);
