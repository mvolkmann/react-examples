import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';

class Counter extends React.Component {
  constructor() {
    super();
    // Top component holds state instead of a Redux store.
    this.state = {number: 0};
  }

  render() {
    return <div>
      {this.state.number} <button onClick={increment}>+</button>
    </div>;
  }
}

const topComponent = ReactDOM.render(
  <Counter/>,
  document.getElementById('content'));

function increment() {
  dispatch({type: 'increment'});
}

function dispatch(action) {
  topComponent.setState(reducer(topComponent.state, action));
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return Object.assign({}, state, {number: state.number + 1});
    default:
      return state;
  }
}
