// @flow

import React from 'react';
import ColorPicker from './color-picker';
import Swatch from './swatch';

import logo from './logo.svg';
import './App.css';

export default () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <div className="body">
      <ColorPicker />
      <Swatch />
    </div>
  </div>
);
