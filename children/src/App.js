import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MyContainer from './my-container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MyContainer>
          <div>child #1</div>
          <div>child #2</div>
        </MyContainer>
      </div>
    );
  }
}

export default App;
