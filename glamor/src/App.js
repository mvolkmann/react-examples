import React, {Component} from 'react';
import {app, appHeader, appIntro, appLogo} from './app-css';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div {...app}>
        <div className={appHeader}>
          <img src={logo} className={appLogo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
