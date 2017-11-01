import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log('App.js componentWillMount: entered');
  }

  componentWillMount() {
    console.log('App.js componentWillMount: entered');
  }

  handleOne = () => console.log('got one');
  handleTwo = () => console.log('got two');

  render() {
    console.log('App.js render: entered');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button id="#one" onClick={this.handleOne}>
          One
        </button>
        <button id="#two" onClick={this.handleTwo}>
          Two
        </button>
      </div>
    );
  }
}

export default App;
